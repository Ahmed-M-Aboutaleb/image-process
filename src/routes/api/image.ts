import express, { Request, Response } from 'express';
import sharp from 'sharp';
import {
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

    if (fileName && width && height) {
        const img: string | null = await getFullPath(fileName as string);
        const thumb: string | null = await getThumbPath(
            width,
            height,
            fileName as string
        );
        const isNameCorrect = await isImageAvailable(fileName as string);

        if (isNameCorrect === false) {
            res.status(400).send('Sorry but the image not found 😞');
        }

        const isCached = await isImgCached(thumb as string);

        if (isCached === true) {
            res.status(200).sendFile(thumb as string);
        }

        try {
            await sharp(img as string)
                .resize(width, height)
                .toFormat('jpeg')
                .toFile(thumb as string);
            res.status(200).sendFile(thumb as string);
        } catch {
            res.status(400).send('Sorry but something went wrong 😞');
        }
    } else {
        res.status(400).send('Sorry but fill all inputs 😞');
    }
});
