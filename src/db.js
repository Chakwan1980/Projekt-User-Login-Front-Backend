// aqui tenemos la conexion a la base de datos 

import mongoose from "mongoose"; //  de esta manera poder trabajar con la base de datos y conexion de mongodb

export const connectDB = async () => { // esta funcion la vamos a importar en otra parte para manejar mongodb
    try {
        await mongoose.connect('mongodb+srv://admin:Rt7wXwyTQFlA9djg@cluster0.cwjwy2f.mongodb.net/merndb?retryWrites=true&w=majority', {
           
        });
        console.log(">>> DB is connected");
    } catch (error) {
        console.error("DB connection error:", error);
    }
};
