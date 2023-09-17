import { Service } from 'typedi';
import { Router, Request, Response } from "express";
import { CoinService } from './service/CoinService';

import { IController } from '../../utils/interfaces/IController';
import { CoinMiddlewares } from './middleware/CoinMiddlewares';
import { ProgramService } from './service/ProgramService';

@Service()
export class CoinController implements IController {

    private router: Router;

    constructor(
        private readonly coinService: CoinService,
        private readonly coinMiddlewares: CoinMiddlewares,
        private readonly programService: ProgramService
    ) {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get(
            '/programs',
            this.coinMiddlewares.grantAccess,
            (req: Request, res: Response) => this.programService.getPrograms(req, res));

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



