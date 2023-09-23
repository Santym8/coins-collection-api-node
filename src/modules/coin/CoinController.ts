import { Service } from 'typedi';
import { Router, Request, Response } from "express";

import { IController } from '../../utils/interfaces/IController';
import { CoinService } from './service/CoinService';

@Service()
export class CoinController implements IController {

    private router: Router;

    constructor(
        private readonly coinService: CoinService
    ) {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get('/',
            async (req: Request, res: Response, next: any) => {
                this.coinService.getCoins()
                    .then(coins => { res.status(200).json(coins); })
                    .catch((err: Error) => next(err));
            });
    }

    public getRouter(): Router {
        return this.router;
    }


}



