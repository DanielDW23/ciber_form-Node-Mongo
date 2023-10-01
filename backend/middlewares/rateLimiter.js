// Middleware para evitar posibles ataques de fuerza bruta

import { rateLimit } from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import { createClient } from 'redis'

const client = createClient({
    url: 'redis://127.0.0.1:6379'
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

function createLimiter(max, windowMs) {
    return rateLimit({
        windowMs: windowMs || 15 * 60 * 1000, // 15 minutos por defecto
        max: max, // límite por IP
        message: "Has excedido el límite de peticiones permitidas",
        store: new RedisStore({
            sendCommand: (...args) => client.sendCommand(args),
        }),
    });
}

const limiter2 = createLimiter(2); // 2 peticiones por ventana de tiempo
const limiter5 = createLimiter(5); // 5 peticiones por ventana de tiempo

export  { limiter2, limiter5 };

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutos
//     max: 2, // limíte por IP: 2 peticiones por ventana de tiempo
//     message: "Has excedido el límite de peticiones permitidas",
//     store: new RedisStore({
//         sendCommand: (...args) => client.sendCommand(args),
//     }),
// });

// export default limiter;