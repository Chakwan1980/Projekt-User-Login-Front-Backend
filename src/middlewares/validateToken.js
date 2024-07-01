// aqui se crearan funcione para autentificar al usuario antes de ingresar a nuestra web


import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';



export const authRequired = (req, res, next) => { // aqui el next indica que si hay un token continue caso contrario no 
   
    const { token } = req.cookies; // Obtiene el token de las cookies asi acceso a todas las cookies
    console.log('Token from cookies:', token);
   
    // si no hay token  se ejecuta el siguiente codigo:
   if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    jwt.verify(token, TOKEN_SECRET, (err, user) => { // si es verdad que tiene un token, reviso si es el q hemos generado
        if (err) {
            console.log('Token verification failed:', err);
            return res.status(403).json({ message: "Invalid token" });
        }

        console.log('Token verified, user:', user);
        req.user = user; // Almacena la información del usuario en la solicitud para su uso posterior
        next(); // Continúa con el siguiente middleware o ruta
    });
};
