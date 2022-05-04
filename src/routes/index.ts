import express, { Request, Response } from 'express';
import { imageApi } from './api/image';

const routes = express.Router();

routes.use('/api/', imageApi);
routes.use('/', (req: Request, res: Response) => res.send('Working ⚒️'));

export default routes;
