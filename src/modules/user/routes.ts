import { Router } from "express";
import { UserController } from './controllers';
import { body } from 'express-validator';
class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get('/', UserController.getUser);
        this.router.post('/create',
            body('username').isLength({ min: 5, max: 15 }),
            body('password').isLength({ min: 5, max: 15 }),
            body('email').isEmail(),
            UserController.createUser
        );
    }


}


const userRoutes = new UserRouter();

export default userRoutes.router;