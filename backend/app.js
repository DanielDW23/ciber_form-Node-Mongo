import express from 'express';
import db from './database/db.js';
import axios from 'axios';
import formRouter from './routes/formRouter.js';
import userRouter from './routes/userRouter.js';
import { limiter2 } from './middlewares/rateLimiter.js';
import recaptchaMiddleware from './middlewares/recaptchaMiddleware.js';
import cors from 'cors';

import 'dotenv/config';


const app = express ();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.post('/form', limiter, async (req, res) => {
//         //    console.log('Form received:', req.body);
//     const secret_key = process.env.SECRET_KEY_RECAPTCHA_V3;
//     const token = req.body["g-recaptcha-response"];
//   try{
//     const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`);
//         console.log('reCAPTCHA response:', response.data);
  
//     if (response.data.success) {
//         console.log("CAPTCHA Verification: correcta");
//         await createForm(req, res);
//     } 
//     else {
      
//       res.status(400).send("reCAPTCHA failed validation!");
//     }

// } catch (error) {
//     console.error("Error al validar reCAPTCHA:", error);
//     res.status(500).send("Error al validar reCAPTCHA");
//   };

// })

import { createForm } from './controller/formController.js';

app.post('/form', /*limiter2,*/ recaptchaMiddleware, async (req, res) => {
    await createForm(req, res);
});

app.use('/form', formRouter);
app.use('/users', userRouter)

const port = process.env.PORT_APP || 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});



