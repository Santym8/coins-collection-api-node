import { Service } from 'typedi';
import { body } from 'express-validator';
import { ValidationMiddleware } from '../../../config/error-handling/GlobalErrorHandling';

@Service()
export class UserValidationMiddleware extends ValidationMiddleware {

    public getCreateUserMiddleware() {
        return [
            body('username').isLength({ min: 5, max: 15 })
                .withMessage('Username must be between 5 and 15 characters'),
            body('password').isLength({ min: 5, max: 15 })
                .withMessage('Password must be between 5 and 15 characters'),
            body('email').isEmail()
                .withMessage('Invalid email'),
            this.validate()
        ];
    }

    public getLoginMiddleware() {
        return [
            body('username').isLength({ min: 5, max: 15 })
                .withMessage('Username must be between 5 and 15 characters'),
            body('password').isLength({ min: 5, max: 15 })
                .withMessage('Password must be between 5 and 15 characters'),
            this.validate()
        ];
    }

}
