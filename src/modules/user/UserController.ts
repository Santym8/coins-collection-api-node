import { Service } from 'typedi';
import { Router, Request, Response } from "express";
import { UserService } from './service/UserSevice';
import { UserValidationMiddleware } from './middleware/UserValidationMiddleware';
import { IController } from '../../utils/interfaces/IController';

@Service()
export class UserController implements IController {
    private router: Router;

    constructor(
        private readonly userService: UserService,
        private readonly userValidationMiddleware: UserValidationMiddleware
    ) {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes(): void {
        this.router.post(
            '/login',
            this.userValidationMiddleware.getLoginMiddleware(),
            (req: Request, res: Response) => this.userService.login(req, res));

        this.router.post(
            '/register',
            this.userValidationMiddleware.getCreateUserMiddleware(),
            (req: Request, res: Response) => this.userService.createUser(req, res));
    }


    public getRouter(): Router {
        return this.router;
    }


}
