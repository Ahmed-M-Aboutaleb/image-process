import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/routes/api/images'));
app.use('/', routes);

app.listen(port, () => console.log(`🚀 Server is running on ${port}`));

export default app;
