import { Router } from "express";
import { UserController } from './controllers';

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get('/', UserController.getUser)
        this.router.get('/create', UserController.createUser)
    }


}


const userRoutes = new UserRouter();

export default userRoutes.router;