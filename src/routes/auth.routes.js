import { Router } from "express";
import { login, register, logout, profile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", (req, res, next) => {
  console.log('Register route hit');
  next();
}, validateSchema(registerSchema), register);

router.post("/login", (req, res, next) => {
  console.log('Login route hit');
  next();
}, validateSchema(loginSchema), login);

router.post('/logout', (req, res, next) => {
  console.log('Logout route hit');
  next();
}, logout);

router.get("/profile", (req, res, next) => {
  console.log('Profile route hit');
  next();
}, authRequired, profile);

router.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default router;




