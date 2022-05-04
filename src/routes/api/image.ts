import express, { Request, Response } from 'express';
import {
    editImg,
    getFullPath,
    getThumbPath,
    isImageAvailable,
    isImgCached,
} from '../../img';

export const imageApi = express.Router();

imageApi.get('/images', async (req: Request, res: Response) => {
    const fileName: unknown = req.query.filename;
    const width = Number(req.query.width);
    const height = Number(req.query.height);

    if (fileName) {
        const img: string | null = await getFullPath(fileName as string);
        const isNameCorrect = await isImageAvailable(fileName as string);
        
        !isNameCorrect && res.status(400).send('Sorry but the image not found 😞');
        if(width && height) {
            width < 1 && res.status(400).send('Enter valid width 😑');
            height < 1 && res.status(400).send('Enter valid heigh 😑');
            const thumb: string | null = await getThumbPath(
                width,
                height,
                fileName as string
            );
            const isCached = await isImgCached(thumb as string);

            isCached && res.status(200).sendFile(thumb as string)

            const editedImg = await editImg(img as string, width, height, thumb as string)
            editedImg ? res.status(200).sendFile(thumb as string) : res.status(400).send('Sorry but something went wrong 😞');
        } else {
            res.status(200).sendFile(img as string);
        }
    } else {
        res.status(400).send('Sorry but fill all inputs 😞');
    }
});
