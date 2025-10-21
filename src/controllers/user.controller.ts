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
