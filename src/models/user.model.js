
// aqui le exiplo a mongoDB como voy a guardar los datos en tabla 
// aqui se escribe el modelo de la base de datos , si no cumple con este modelo de datos nos va a dar error 
// es la menera en la que se va a guardar los datos

import mongoose from "mongoose";  // importo mongodb con este nombre que es mongoose 


// este es el modelo de nuestro objeto  / username email password serian las propiedades del objeto
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,  // obliga que haya un dato
        trim:true // quita los espacios que puedan haber entre palabras
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true // obliga que el dato sea unico ejemplo el email por su puesto
    },
    password:{
        type: String,
        required:true
        
    },
},
{
        timestamps: true // la fecha en la que se creo el usuario
    
})

export default mongoose.model('User', userSchema)  // aqui relizara nuevos objetos que se llamaran en el modelo "User"
/// esos datos que cada vez haya un  post seran de modelo usuario cada vez se crearan nuevos objetos ejemplo:
//users{}
//users{}  en definitiva con esto interactuo con la base de datos 