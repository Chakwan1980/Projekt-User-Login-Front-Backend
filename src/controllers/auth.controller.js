//hace conexion con auth.routes
/* esto es un ejemplo sin datos de clientes solo para probar las rutas
export const register = (req, res) => res.send("register"); // cuando yo llame a register me aparecera el mensaje registrado
export const login = (req, res) => res.send("login"); */

import User from "../models/user.model.js"; /// aqui importo el modelo del usuario que se va a crear
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

////////////////  RUTA DEL USERNAME FUNCTION REGISTER

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  // creo un nuevo objeto cada vez que un usuario nuevo  genere la cuenta / esta estructura esta solo en backend no en la base de datos

  try {
    const passwordHash = await bcrypt.hash(password, 10); // de esta manera encriptamos el password

    const newUser = new User({
      // de esta manera creo un nuevo objeto con sus respectivos parametros
      username,
      email,
      password: passwordHash, // se podria hacer sin passwordHash pero no estaria encriptada
    });
    console.log(newUser);

    // despues de crear este nuevo objeto se lo puede alterar como quiera

   //*** ESTO HACE QUE LOS DATOS SE DEVUELVAN AL FRONTEND */ 



    const userSaved = await newUser.save();

    // aqui utilizo el createAccessToken que he importado 
    const token = await createAccessToken({ id: userSaved._id }); /// despues que se crea el token :
    res.cookie("token", token); // se guarda los datos en la cookies al frontend
    res.json({
      // estos datos son los que utiiza frontend en la interface
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });

    // aqui aparecen los datos que el cliente envie, esos datos llegan en lenguaje .json aparecen en body

    // despues de crearse el nuevo usuario se lo enviamos a guardar a mongodb
    // await porque es asyncronico
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// aqui controlamos el login del usuario  RUTA DEL LOGIN


export const login = async (req, res) => {
  const { email, password } = req.body;
  // creo un nuevo objeto cada vez que u;n usuario nuevo  genere la cuenta / esta estructura esta solo en backend no en la base de datos

  try { // aqui con userFound vamos a buscar al usuario por email porejemplo
    const userFound = await User.findOne({ email }); // aqui se almacena el usuario que fue encontrado


     // si no encontro el usuario envia este mensaje
    if (!userFound) return res.status(400).json({ message: "User not found" });

    //si coincide hace match se cumple este codigo este compare me devuelve un verdadero o falso
    // porque tiene que comparar con los datos que tenemos almacenados
    const isMatch = await bcrypt.compare(password, userFound.password); // el compare es asyncrone y me devuelve verdadero o falso
    
    // si no coincide la contrasena y  es falso aparece este dato
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });



    const token = await createAccessToken({ id: userFound._id }); /// despues que se crea el token del usuario encontrado :

    res.cookie("token", token); // se guarda los datos en la cookies al frontend
    res.json({
      // estos datos son los que utiiza frontend en la interface
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
    });

    // aqui aparecen los datos que el cliente envie, esos datos llegan en lenguaje .json aparecen en body

    // despues de crearse el nuevo usuario se lo enviamos a guardar a mongodb
    // await porque es asyncronico
  } catch (err) {
    console.log(err);
  }
};

// PARA LOGOUT
/*
    export const logout = (req, res) =>{
       res.cookie('token', '', {
       expires: new Date(0),
       }) 
       return res.sendStatus(200);
    };*/


    /// FUNCION LOGOUT   nueva ruta  viebde de auth.routes.js



export const logout = (req, res) => {
  // Elimina la cookie 'token' configurándola con una fecha de expiración pasada
  res.cookie("token", "", {
    expires: new Date(0), // Fecha de expiración en el pasado
    httpOnly: true, // Asegúrate de incluir httpOnly si fue utilizado al crear la cookie
    secure: true, // Incluye secure si la cookie se estableció como segura (HTTPS)
    sameSite: "strict", // Mismo sitio (puede ser 'strict', 'lax', o 'none' dependiendo de cómo se configuró)
    path: "/", // Incluye el path si se utilizó al crear la cookie
  });

  // Envía una respuesta con estado 200 para indicar que la operación fue exitosa
  return res.sendStatus(200);
};




////////////////  RUTAS SEGURA ENTRE RUTAS

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id); // eso explica que busque al usuario por ID 
  
  if(!userFound) return res.status(400).json({message:"User not found"})
  
  
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt : userFound.updatedAt,

  })
    // respuesta.enviar "profile"
};
