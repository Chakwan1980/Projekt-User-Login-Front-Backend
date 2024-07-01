import { Router} from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { getTask,getTasks,createTask,updateTask,deleteTask } from "../controllers/task.controller.js"
import { validateSchema } from "../middlewares/validator.middleware.js"
import { createTaskSchema } from "../schemas/task.chema.js"

const router = Router() // todo esto es cuando el usuario ya se ha logado con su usuario  y password 
router.get('/tasks', authRequired, getTasks )  // obteber
router.get('/tasks/:id', authRequired, getTask )
router.post('/tasks', authRequired, validateSchema(createTaskSchema),createTask  )  // crear
router.delete('/tasks/:id', authRequired, deleteTask)  //eliminar
router.put('/tasks/:id', authRequired, updateTask ) // 

export default router