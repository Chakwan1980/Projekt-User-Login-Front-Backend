// este es el esquema de las tareas

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
 title:{
    type:String,
    required:true,
 },
 description:{
    type: String,
    required: true,
 },
 date:{
    type:Date,
    defaul:Date.now,
 },
 user:{
 type: mongoose.Schema.Types.ObjectId,
 ref:"User",
 required:true
 }   
}, {
    timestamps:true
});

export default mongoose.model("Task", taskSchema);