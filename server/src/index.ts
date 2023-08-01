import express from 'express';
import dotenv from 'dotenv';

dotenv.config()

import './database/database/databse'
import { port } from './config/config';

import provinciaRoute from './routes/provincias.routes';

const app = express()

app.set('port', port)

app.use(provinciaRoute)

app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));  
})
