import { Service } from 'typedi';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { UserRepository } from '../repository/UserRepository';
import { IRequestWithUserId } from '../utils/IRequestWithUserId';
import { TokenManagement } from '../utils/TokenManagement';

@Service()
export class UserMiddlewares {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly encryptor: TokenManagement
    ) { }

    public verifyToken = async (req: IRequestWithUserId, res: Response, next: any) => {
        try {
            const token = req.headers['x-access-token'];
            if (!token) return res.status(401).json({ message: 'No token' });
            const id: string = this.encryptor.verifyToken(token as string);
            const user = await this.userRepository.getUserById(id);
            if (!user) return res.status(401).json({ message: 'User does not exist' });
            req.userId = id;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unuthorized' });
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
        body('username').isLength({ min: 5, max: 15 })
            .withMessage('Username must be between 5 and 15 characters'),
        body('password').isLength({ min: 5, max: 15 })
            .withMessage('Password must be between 5 and 15 characters'),
        body('email').isEmail()
            .withMessage('Invalid email'),
        this.grantAccess
    ];

    public loginMiddleware = [
        body('username').isLength({ min: 5, max: 15 })
            .withMessage('Username must be between 5 and 15 characters'),
        body('password').isLength({ min: 5, max: 15 })
            .withMessage('Password must be between 5 and 15 characters'),
        this.grantAccess
    ];

}
