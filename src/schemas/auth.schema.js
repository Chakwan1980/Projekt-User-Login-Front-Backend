
import {z} from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error:'Username is required'  
  }),
  email: z.string({
    required_error:'email is required'  

  }).email({
    message:'invalid email'
  }),
  password:z.string({
    required_error:'password is required' 

  }).min(6,{
    message:'Password mut be at least 6 characters'
  })
})

export const loginSchema = z.object({
    email: z.string({ // lo que hacemos aqui es que verifica que el email, password sean string
        required_error:"email is required"
    }).email({
        message:"invalid email",
    }),
    password: z.string({
        required_error:"password is required"
    }).min(6, {
        message:"Password mudt be at least 6 characters",
    }),
});