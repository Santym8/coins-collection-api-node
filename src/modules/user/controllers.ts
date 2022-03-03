import { Request, Response } from 'express';
import UserModel from './models/User';
import { validationResult } from 'express-validator';



export class UserController {


    public static async createUser(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const newUser = new UserModel(req.body);
        await newUser.save()
            .then(() => {
                return res.json(newUser)
            })
            .catch((err: any) => {
                console.log(err);
                return res.json({ errors: 'Error' });
            })
    }

    public static async getUser(req: Request, res: Response) {
        const { username, password } = req.query;
        const user = await UserModel.findOne({ username: username, password: password });
        res.json(user);
    }
}
