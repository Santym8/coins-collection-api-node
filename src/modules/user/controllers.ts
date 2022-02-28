import {Request, Response} from 'express';

export class UserController{
    

    public static createUser(req:Request, res:Response){
        res.send('Create User');
    }

    public static getUser(req:Request, res:Response){
        res.send('Get User');
    }
}
