import path from 'path';
import * as fs from 'fs';

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

export async function isImageAvailable(
    filename: string = ''
): Promise<boolean> {
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
