//// aqui se escribiran funciones que se utilizaran varias veces 
// esta funcion ayuda a implementar el cookies

import { TOKEN_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';



export function createAccessToken(payload) {  // token de acceso

    return new Promise((resolve, reject) => {  // es un objeto global de node. puede salir bin o mal debe haber resultado
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
}
