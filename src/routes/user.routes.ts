
import { Router } from "express";
import { actualizarDatos, crearUsuarios, getUsers } from "../controllers/user.controller";

const router = Router();

router.get("/users" , getUsers);
router.post("/users", crearUsuarios);
router.put("/users/:id",actualizarDatos);

export default router;
