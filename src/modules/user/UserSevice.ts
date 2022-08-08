import { Service } from 'typedi';
import { UserRepository } from './models/repository/UserRepository';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

@Service()
export class UserService {

    constructor(private readonly userRepository: UserRepository) { }

    public async createUser(req: Request, res: Response) {
        const newUser = this.userRepository.createUser(req);
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

    public async getUser(req: Request, res: Response) {
        let userRepository = this.userRepository;
        try {
            const { username, password } = req.query;

            if (username == undefined || password == undefined) {
                return res.json({ message: 'Empty fields' });
            }

            const user = await userRepository.getUserByUsername(username as string);
            if (!user) {
                return res.json({ message: 'The user dose not exist' });
            }

            const matchPassword = await bcrypt.compare(password as string, user.password);
            if (!matchPassword) {
                return res.json({ message: 'icorrect password' });
            }

            const token = jwt.sign({ _id: user.id }, 'collector-api', { expiresIn: 3600 });
            return res.json({ token });
        } catch (error: any) {
            return res.json({ message: error.message });
        }

    }


}
