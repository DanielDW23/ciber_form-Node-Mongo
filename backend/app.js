import express from 'express';
import db from './database/db.js';
import axios from 'axios';
import FormRouter from './routes/FormRoutes.js';
import cors from 'cors';

import 'dotenv/config';

import { rateLimit } from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import { createClient } from 'redis'

const client = createClient({
    url: 'redis://127.0.0.1:6379'
})

client.on('error', err => console.log('Redis Client Error', err));

await client.connect()

// Configura el middleware del rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 30, // limíte por IP: 2 peticiones por ventana de tiempo
    message: "Has excedido el límite de peticiones permitidas", // mensaje a mostrar cuando se excede el límite

    store: new RedisStore({
        // client: client
        sendCommand: (...args) => client.sendCommand(args),
    }),
});

const app = express ();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/', limiter, async (req, res) => {
           console.log('Form received:', req.body);
    const secret_key = process.env.SECRET_KEY_RECAPTCHA_V3;
    const token = req.body["g-recaptcha-response"];
  
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`);
        console.log('reCAPTCHA response:', response.data);
  
    if (response.data.success) {
        console.log("CAPTCHA Verification: correcta");
        
    } 
    else {
      
      res.status(400).send("reCAPTCHA failed validation!");
    }
  });

app.use('/form', FormRouter);

app.listen(8000, () => {
    console.log('Servidor iniciado en el puerto 8000');
});



