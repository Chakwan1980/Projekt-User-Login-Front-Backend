// aqui se escribira todo el codigo del backend




import express from 'express'; // el primer paso despues de instalar express es importarlo de esta manera
import morgan from 'morgan';// controlamos los get /post /put /etc
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'; // despues de instalar ayuda a convertir la cookie en objeto .json
import taskRoutes from './routes/tasks.routes.js'
import cors from 'cors'



const app = express() // aqui estamos utilizando el servidor
// aqui se configura todo el codigo de backend
//le importo lo envuelvo en una variable y lo importo
app.use(cors({
    origin: 'http://localhost:5173', // Permitir solicitudes desde este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true // Si deseas permitir el uso de cookies
  }));


app.use(morgan('dev')); // es para que nos muestre un mensaje corto en consola porque utiliuzaremos morgan para controlar las peticiones del front
app.use(express.json()); // esto hace que los datos que recibimos se podran leer sin problema
// con esto se elimina el undefinef d(app.use(express.json()); ) porque ya esta definido en .json
app.use(cookieParser());
app.use("/api", authRoutes); // le digo a la aplicacion que utilice authroutes// 
//para que se diferencien las rutas de frontend pongo /api/antes de las  rutas authRoutes
app.use("/api", taskRoutes);





export default app;   /// unaz lista para exportar lo importa app.js