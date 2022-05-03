import supertest from 'supertest';
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
        expect(response.status).toBe(400);
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
        expect(response.status).toBe(400);
    });
});
