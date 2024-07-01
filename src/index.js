// aqui creamos el motor de arranque de la aplicacion 

import app from './app.js'  // acabo de importar el servidor 
import { connectDB } from './db.js'  // aqui importo con llaves  este datei lo hice yo


connectDB().then(() => { // aqui le digo primero conectate a la base de datos
app.listen(4000, ()=>{ // despues que se conecta a la BD inicia el servidor
console.log('Server conexion succesfull on port' ,4000);
});
}).catch(err => {
    console.error("Error , Failed to connect to the database" , err);
});