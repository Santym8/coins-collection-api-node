import { Service } from 'typedi';
import { Router, Request, Response } from "express";
import { CoinsCollectorService } from './service/CoinsCollectorService';

import { IController } from '../../utils/interfaces/IController';
import { IRequestWithUserId } from '../../config/jwt/IRequestWithUserId';

@Service()
export class CoinsCollectorController implements IController {

    private router: Router;

    constructor(
        private readonly coinService: CoinsCollectorService,
    ) {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get(
            '/coins_of_collector',
            (req: IRequestWithUserId, res: Response, next: any) => {
                const idCollector = req.userId || '';
                const idCollection = req.query.idCollection?.toString() || '';
                this.coinService.getAllCoinsWithFounded(idCollector, idCollection)
                    .then(coins => res.status(200).json(coins))
                    .catch(err => next(err));
            });

        this.router.put(
            '/add_delete',
            (req: IRequestWithUserId, res: Response, next: any) => {
                const idCollector = req.userId || '';
                const idCoin = req.body.idCoin || '';
                this.coinService.addOrDeleteCoinOfCollector(idCollector, idCoin)
                    .then(result => res.status(200).json(result))
                    .catch(err => next(err));
            });
    }

    public getRouter(): Router {
        return this.router;
    }


}



