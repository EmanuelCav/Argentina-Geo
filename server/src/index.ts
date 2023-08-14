import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

dotenv.config()

import './database/database/database'
import { port } from './config/config';

import userRoute from './routes/user.routes';
import roleRoute from './routes/role.routes';
import imageRoute from './routes/image.routes';
import questionRoute from './routes/questions.routes';
import categoryRoute from './routes/category.routes';

const app = express()

app.set('port', port)

app.use(morgan('dev'))
app.use(cors())
app.use(express.json({ limit: '30mb' }))
app.use(express.urlencoded({ extended: false, limit: '30mb' }))

app.use(userRoute)
app.use(roleRoute)
app.use(imageRoute)
app.use(questionRoute)
app.use(categoryRoute)

app.use(express.static(path.join(__dirname, "../public")))

app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));  
})
