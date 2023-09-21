import { Service } from 'typedi';
import { Router, Request, Response } from "express";
import { CoinsCollectorService } from './service/CoinsCollectorService';

import { IController } from '../../utils/interfaces/IController';
import { CoinMiddlewares } from './middleware/CoinsCollectorMiddlewares';

@Service()
export class CoinsCollectorController implements IController {

    private router: Router;

    constructor(
        private readonly coinService: CoinsCollectorService,
        private readonly coinMiddlewares: CoinMiddlewares,
    ) {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get(
            '/coins_of_collector',
            this.coinMiddlewares.grantAccess,
            (req: Request, res: Response) => this.coinService.getAllCoinsWithFounded(req, res));

        this.router.put(
            '/add_delete',
            this.coinMiddlewares.grantAccess,
            (req: Request, res: Response) => this.coinService.addOrDeleteCoinOfCollector(req, res));
    }

    public getRouter(): Router {
        return this.router;
    }


}



