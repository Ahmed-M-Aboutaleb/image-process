import path from 'path';
import * as fs from 'fs'
import supertest from 'supertest';
import { editImg, getFullPath, getThumbPath, isImageAvailable } from '../img';
import app from '../index';

const request = supertest(app);
describe('Test endpoints responses', () => {
    it('get /', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
    it('get /api', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });
    it('get /api/images', async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(400);
    });
    it('get /api/images?filename=encenadaport', async () => {
        const response = await request.get('/api/images?filename=encenadaport');
        expect(response.status).toBe(200);
    });
    it('get /api/images?filename=encenadaport&width=200&height=400', async () => {
        const response = await request.get(
            '/api/images?filename=encenadaport&width=200&height=400'
        );
        expect(response.status).toBe(200);
    });
    it('get /api/images?filename=encenadaport&width=test&height=test', async () => {
        const response = await request.get(
            '/api/images?filename=encenadaport&width=test&height=test'
        );
        expect(response.status).toBe(200);
    });
});

describe('Test functions', () => {
    it('test proccessing function', async () => {
        const imagePath = path.resolve(__dirname, '../../images/full/encenadaport.jpg');
        const width = 200;
        const height = 200;
        const thumb: string | null = await getThumbPath(
            width,
            height,
            'encenadaport'
        );
        expect(async() => {await editImg(imagePath, width, height, thumb as string)}).not.toThrow();
    })
    it('test getFullPath function', async () => {
        expect(async () => {
            await getFullPath('encenadaport')
        }).not.toThrow();
    })
    it('test getThumbPath function', async () => {
        expect(async () => {
            await getThumbPath(200, 200,'encenadaport')
        }).not.toThrow();
    })
    it('test isImageAvailable function', async () => {
        expect(async () => {
            await isImageAvailable('encenadaport')
        }).not.toThrow();
    })
})

afterAll(async () => {
    const imagePath1 =  path.resolve(__dirname, '../../images/thumb/encenadaport-200x400.jpg');
    const imagePath2 =  path.resolve(__dirname, '../../images/thumb/encenadaport-200x200.jpg');
    
    await fs.unlinkSync(imagePath1)
    await fs.unlinkSync(imagePath2)
})