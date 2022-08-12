import { Service } from 'typedi';
import { Router, Request, Response } from "express";
import { CoinService } from './CoinService';

import { IController } from '../../utils/interfaces/IController';
import { CoinMiddlewares } from './CoinMiddlewares';

@Service()
export class CoinController implements IController {

    private router: Router;

    constructor(
        private readonly coinService: CoinService,
        private readonly coinMiddlewares: CoinMiddlewares
    ) {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get(
            '/programs',
            this.coinMiddlewares.grantAccess,
            (req: Request, res: Response) => this.coinService.getPrograms(req, res));

        this.router.get(
            '/coins_of_collector',
            this.coinMiddlewares.grantAccess,
            (req: Request, res: Response) => this.coinService.getAllCoins(req, res));

        this.router.put(
            '/add_delete',
            this.coinMiddlewares.grantAccess,
            (req: Request, res: Response) => this.coinService.addDeleteCoinOfCollection(req, res));
    }

    public getRouter(): Router {
        return this.router;
    }


}



