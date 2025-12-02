//aqui va el CRUD
import {Request, Response } from  "express";
import { UserService } from "../services/user.service";
import User from "../models/user.model";

const userService = new UserService();

export const getUsers = async (
    _req: Request,
    res: Response
): Promise<Response> => {

try{
    console.log('test');
    const users = await userService.getAllUsers();
    console.log('est');
    return res.status(200).json(users);
}catch (error: any){
    console.log(error)
    return res.status(500).json({message: 'Error al obtener los usuarios', error: error.message})
}
};

//insertar datos
export const crearUsuarios = async (req: any, res: any) => {
    try{
        const { nombre, email, contrasenia, id_roles } = req.body;

        if(!nombre || !email || !contrasenia || !id_roles){
            return res.status(400).json({
                message : "Todos los campos son obligatorios",
            });
        }

      const nuevoUsuario =   await User.create({        
            nombre, 
            email,
            contrasenia,
            id_roles,
        });

        return res.status(200).json({
        message : "USUARIO CREADO EXITOSAMENTE :D"
        });
       

    } catch(error){
        return res.status(500).json({
            message: "Error al crear usuario",
        });
    }
};

// eliminar
export const eliminarUsuario = async (req: any, res: any) => {
  try {
      // El ID del usuario a eliminar se toma de los parámetros de la URL (ej: /usuarios/123)
      const userId = req.params.id;

      // 1. Intentar eliminar el usuario
      // El método destroy de Sequelize devuelve el número de filas eliminadas
      const filasEliminadas = await User.destroy({
          where: { id: userId },
      });

      // 2. Comprobar si se eliminó alguna fila
      if (filasEliminadas === 0) {
          // Si filasEliminadas es 0, el usuario con ese ID no fue encontrado
          return res.status(404).json({
              message: "Usuario no encontrado para eliminar",
          });
      }

      // 3. Respuesta exitosa
      return res.status(200).json({
          message: "USUARIO ELIMINADO EXITOSAMENTE :D",
          id_eliminado: userId
      });

  } catch (error) {
      console.error(error);
      return res.status(500).json({
          message: "Error al intentar eliminar el usuario",
          error,
      });
  }
};

//update
/*export const actualizarDatos = async (req: any, res: any) =>{
try{
    const {nombre, email, contrasenia, id_roles} = req.body;

    if(!nombre || !email || !contrasenia || !id_roles){
        return res.status(400).json({
            message : "Todos los campos son obligatorios",
        });
    }

    const camposAActualizar: any = {};

    if (req.body.nombre) camposAActualizar.nombre = req.body.nombre;
    if (req.body.email) camposAActualizar.email = req.body.email;
    if (req.body.contrasenia) camposAActualizar.contrasenia = req.body.contrasenia;
    if (req.body.id_roles) camposAActualizar.id_roles = req.body.id_roles;
    
    await User.update(camposAActualizar, {
      where: { id: req.params.id },
    });


    if (camposAActualizar === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      };

    return res.estatus(200).json({
        message : "DATOS ACTUALIZADOS  :D"
        });
    }catch(error){
        return res.status(500).json({
            message: error ,
        });

}

};*/
//update
export const actualizarDatos = async (req: any, res: any) => {
    try {
      const { nombre, email, contrasenia, id_roles } = req.body;
  
      // Validación básica
      if (!nombre || !email || !contrasenia || !id_roles) {
        return res.status(400).json({
          message: "Todos los campos son obligatorios",
        });
      }

      
      

      
      // Crear objeto con los campos a actualizar
      const camposAActualizar: any = {};
  
      if (req.body.nombre) camposAActualizar.nombre = req.body.nombre;
      if (req.body.email) camposAActualizar.email = req.body.email;
      if (req.body.contrasenia) camposAActualizar.contrasenia = req.body.contrasenia;

      if (req.body.id_roles) camposAActualizar.id_roles = req.body.id_roles;

      const existeRol = await User.findOne({ where: { id_roles } });
      if (!existeRol) {
      return res.status(400).json({ message: `El rol con id ${id_roles} no existe` });
}


      console.log("ID recibido:", req.params.id);
      console.log("Body recibido:", req.body);
      
      const [filasActualizadas] = await User.update(camposAActualizar, {
        where: { id: req.params.id },
      });
  
    
      if (filasActualizadas === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
     
      return res.status(200).json({
        message: "DATOS ACTUALIZADOS :D",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al actualizar los datos",
        error,
      });
    }
  };
  
