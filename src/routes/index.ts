import express from 'express';
import { imageApi } from './api/image';

const routes = express.Router();

routes.use('/api/', imageApi);
routes.use('/', (req, res) => res.send('Working ⚒️'));

export default routes;
