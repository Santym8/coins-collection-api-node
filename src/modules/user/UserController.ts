import { Service } from 'typedi';
import { Router, Request, Response } from "express";
import { UserService } from './service/UserSevice';
import { UserValidationMiddleware } from './middleware/UserValidationMiddleware';
import { IController } from '../../utils/interfaces/IController';
import { LoginRequest } from './dto/LoginRequest';
import { RegisterRequest } from './dto/RegisterRequest';
import { TokenResponse } from './dto/TokenResponse';

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
            (req: Request, res: Response, next: any) => {
                const {username, password} = req.body;
                const loginRequest = new LoginRequest(username, password);
                this.userService.login(loginRequest)
                    .then((token: string) => res.status(200).json(new TokenResponse(token)))
                    .catch((err: Error) => next(err));
            }
        );

        this.router.post(
            '/register',
            this.userValidationMiddleware.getCreateUserMiddleware(),
            (req: Request, res: Response, next: any) => {
                const { username, password, email } = req.body;
                const registerRequest = new RegisterRequest(username, password, email);
                this.userService.createUser(registerRequest)
                    .then((token: string) => res.status(201).json(new TokenResponse(token)))
                    .catch((err: Error) => next(err));
            }
        );
    }


    public getRouter(): Router {
        return this.router;
    }


}
