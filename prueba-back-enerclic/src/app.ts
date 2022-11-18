import express from 'express';
import api from './routes/api';
import home from './routes/home';

const app = express();

app.get('/', home);
app.get('/api', api);

const port = 5003;

app.listen(port, () => console.log(`App listening on PORT ${port}`));
