import { Service } from 'typedi';
import { body } from 'express-validator';

@Service()
export class UserMiddlewares {

    public createUserMiddleware = [
        body('username').isLength({ min: 5, max: 15 })
            .withMessage('Username must be between 5 and 15 characters'),
        body('password').isLength({ min: 5, max: 15 })
            .withMessage('Password must be between 5 and 15 characters'),
        body('email').isEmail()
            .withMessage('Invalid email'),
    ];

    public loginMiddleware = [
        body('username').isLength({ min: 5, max: 15 })
            .withMessage('Username must be between 5 and 15 characters'),
        body('password').isLength({ min: 5, max: 15 })
            .withMessage('Password must be between 5 and 15 characters'),
    ];

}
