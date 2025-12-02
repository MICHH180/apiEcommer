
import { Router } from "express";
import { actualizarDatos, crearUsuarios, getUsers,eliminarUsuario } from "../controllers/user.controller";

const router = Router();

router.get("/users" , getUsers);
router.post("/users", crearUsuarios);
router.put("/users/:id",actualizarDatos);
router.delete("/users/:id",eliminarUsuario);

export default router;
