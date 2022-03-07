import { Request, Response } from 'express';
import UserModel from './models/User';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export class UserController {


    public static async createUser(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const newUser = new UserModel(req.body);
        await newUser.save()
            .then(() => {
                const token = jwt.sign({ _id: newUser.id }, 'collector-api', { expiresIn: 3600 })
                return res.status(200).json({ token });
            })
            .catch((err: any) => {
                console.log(err);
                return res.json({ errors: 'Error' });
            })
    }

    public static async getUser(req: Request, res: Response) {
        const { username, password } = req.query;
        const user = await UserModel.findOne({ username: username });
        if (user) {
            const matchPassword = await bcrypt.compare(password as string, user.password);
            if (matchPassword) {
                const token = jwt.sign({ _id: user.id }, 'collector-api', { expiresIn: 3600 });
                return res.json({ token });
            }
            return res.json({ message: 'icorrect password' });
        }
        return res.json({ message: 'The user dose not exist' });
    }


}
