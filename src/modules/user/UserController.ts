import { Service } from 'typedi';
import { Router, Request, Response } from "express";
import { UserService } from './service/UserSevice';
import { IController } from '../../utils/interfaces/IController';
import { LoginRequest } from './dto/LoginRequest';
import { RegisterRequest } from './dto/RegisterRequest';
import { TokenResponse } from './dto/TokenResponse';
import { validateOrReject } from 'class-validator'
@Service()
export class UserController implements IController {
    private router: Router;

    constructor(
        private readonly userService: UserService
    ) {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes(): void {
        this.router.post(
            '/login',
            (req: Request, res: Response, next: any) => {
                const loginRequest = LoginRequest.fromBody(req.body);
                validateOrReject(loginRequest)
                    .then(() =>
                        this.userService.login(loginRequest)
                            .then((token: string) => res.status(200).json(new TokenResponse(token)))
                            .catch((err: Error) => next(err))
                    )
                    .catch((errors: any) => next(errors))
            }
        );

        this.router.post(
            '/register',
            (req: Request, res: Response, next: any) => {
                const registerRequest = RegisterRequest.fromBody(req.body);
                validateOrReject(registerRequest)
                    .then(() => {
                        this.userService.createUser(registerRequest)
                            .then((token: string) => res.status(201).json(new TokenResponse(token)))
                            .catch((err: Error) => next(err))
                    })
                    .catch((errors: any) => next(errors))
            }
        );
    }


    public getRouter(): Router {
        return this.router;
    }


}
