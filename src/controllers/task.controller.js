// creamos funciones e importamos las tareas de modelos
import Task from '../models/task.model.js'



export const getTasks =  async (req, res) =>{
 const tasks = await Task.find({
    user: req.user.id  // esto hace que las tareas aparezcan solo del usuario identificado 
 }).populate('user') // ademas me imprime todos los datos del usuario 
 res.json(tasks)
};





export const createTask =  async (req, res) =>{
const {title, description,date} = req.body
console.log(req.user) // podemos ver lo datos del usuario
const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id
})
const savedTask = await newTask.save()
res.json(savedTask)
};
export const getTask =  async (req, res) =>{
    const task = await Task.findById(req.params.id)
    if(!task) return res.status(404).json({message:"Task not found"})
    res.json(task)

};

export const deleteTask =  async (req, res) =>{
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({message:"Task not found"})
    return res.sendStatus(204); // significa que se borro existosamente pero no aparecera ningun  dato
};

export const updateTask =  async (req, res) =>{
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!task) return res.status(404).json({message:"Task not found"})
    res.json(task)

};