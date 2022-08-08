import { Service } from 'typedi';
import { Router, Request, Response } from "express";
import { UserService } from './UserSevice';
import { UserMiddlewares } from './UserMiddlewares';
import { IController } from '../../utils/interfaces/IController';

@Service()
export class UserController implements IController {
    private router: Router;

    constructor(private readonly userService: UserService) {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes(): void {
        this.router.get('/',
            (req: Request, res: Response) => this.userService.getUser(req, res));

        this.router.post('/create',
            UserMiddlewares.createUserMiddleware,
            (req: Request, res: Response) => this.userService.createUser(req, res));
    }


    public getRouter(): Router {
        return this.router;
    }


}
