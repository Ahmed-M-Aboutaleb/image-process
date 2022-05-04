import path from 'path';
import * as fs from 'fs';
import sharp from 'sharp';

const imagesPath = path.resolve(__dirname, '../images/full');
const thumbsPath = path.resolve(__dirname, '../images/thumb');

/**
 *
 * @param imgName string
 * @returns full resolution image path
 *
 * Gets full resolution image path by name
 *
 */

export function getFullPath(imgName: string): null | string {
    if (!imgName) {
        return null;
    }
    const imgFullPath: string = path.resolve(imagesPath, `${imgName}.jpg`);
    return imgFullPath;
}

/**
 *
 * @param width number
 * @param height number
 * @param imgName string
 * @returns thumb image path
 *
 * Gets thumb image path by name
 *
 */

export function getThumbPath(
    width: number,
    height: number,
    imgName: string
): string | null {
    if (!imgName || !height || !width) {
        return null;
    }
    const imgThumbPath: string = path.resolve(
        thumbsPath,
        `${imgName}-${width}x${height}.jpg`
    );
    return imgThumbPath;
}

/**
 *
 * @returns Full resolution images names
 *
 */

async function getAvailableImages(): Promise<string[]> {
    try {
        return (await fs.readdirSync(imagesPath)).map(
            (filename: string): string => filename.split('.')[0]
        );
    } catch {
        return [];
    }
}

/**
 *
 * @param filename string
 * @returns true or false
 *
 * check if images contain user input
 *
 */

export async function isImageAvailable(filename: string): Promise<boolean> {
    if (!filename) {
        return false;
    }

    return (await getAvailableImages()).includes(filename);
}

/**
 *
 * @param thumb string
 * @returns thumb image path
 *
 * Check if user input is cached
 *
 */

export async function isImgCached(thumb: string): Promise<boolean> {
    try {
        await fs.accessSync(thumb);
        return true;
    } catch {
        return false;
    }
}

/**
 *
 * @param img string
 * @param width number
 * @param height number
 * @param thumb string
 * @returns boolean value if img resized or no
 *
 * Resize the img
 *
 */

export async function editImg(img:string, width:number, height:number, thumb:string): Promise<boolean> {
    !fs.existsSync(thumbsPath) && fs.mkdirSync(thumbsPath) // Check if thumb dir exist and if not it creates it
    try {
        await sharp(img as string).resize(width, height).toFormat('jpeg').toFile(thumb as string);
        return true
    }catch {
        return false
    }
}