import { Service } from 'typedi';
import { Router, Request, Response } from "express";
import { UserService } from './UserSevice';
import { body } from 'express-validator';
import { IController } from '../../utils/interfaces/IController';

@Service()
export class UserController implements IController{
    private router: Router;

    constructor(private readonly userService: UserService) {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get('/', (req: Request, res: Response) => this.userService.getUser(req, res));
        this.router.post('/create',
            body('username').isLength({ min: 5, max: 15 }),
            body('password').isLength({ min: 5, max: 15 }),
            body('email').isEmail(),
            (req: Request, res: Response) => this.userService.createUser(req, res)
        );
    }


    public getRouter(){
        return this.router;
    }


}
