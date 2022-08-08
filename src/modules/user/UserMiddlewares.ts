import { Service } from 'typedi';
import { verify } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { UserRepository } from './models/repository/UserRepository';
import { IRequestWithUserId } from './utils/IRequestWithUserId';

@Service()
export class UserMiddlewares {

    constructor(private readonly userRepository: UserRepository) { }

    public verifyToken = (req: IRequestWithUserId, res: Response, next: any) => {
        try {
            const token: string = req.headers['x-access-token'] as string;
            if (!token) return res.json({ message: 'No token' });
            const id: string = verify(token, 'collector-api') as string;
            const user = this.userRepository.getUserById(id);
            if (!user) return res.json({ message: 'User dose not exist' });
            req.userId = id;
            next();
        } catch (error) {
            return res.json({ message: 'Unuthorized' });
        }
    }

    // Checks if there are any problem
    private grantAccess = (req: Request, res: Response, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    }

    public createUserMiddleware = [
        body('username').isLength({ min: 5, max: 15 }),
        body('password').isLength({ min: 5, max: 15 }),
        body('email').isEmail(),
        this.grantAccess
    ];

}
