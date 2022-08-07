import { Service } from 'typedi';
import { Router } from "express";
import { UserService } from './UserSevice';
import { body } from 'express-validator';

@Service()
export class UserController {
    public router: Router;

    constructor(private readonly userService:UserService) {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get('/', this.userService.getUser);
        this.router.post('/create',
            body('username').isLength({ min: 5, max: 15 }),
            body('password').isLength({ min: 5, max: 15 }),
            body('email').isEmail(),
            this.userService.createUser
        );
    }


}
