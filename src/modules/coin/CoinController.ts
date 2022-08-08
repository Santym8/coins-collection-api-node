import { Service } from 'typedi';
import { Router, Request, Response } from "express";
import { CoinService } from './CoinService';
import { Middlewares } from './Middlewares';
import { IController } from '../../utils/interfaces/IController';

@Service()
export class CoinController implements IController {

    private router: Router;

    constructor(private readonly coinService: CoinService) {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get('/programs', Middlewares.verifyToken, (req: Request, res: Response) => this.coinService.getPrograms(req, res));
        this.router.get('/coins_of_collector', Middlewares.verifyToken, (req: Request, res: Response) => this.coinService.getCoinsOfCollector(req, res));
        this.router.put('/add_delete', Middlewares.verifyToken, (req: Request, res: Response) => this.coinService.addDeleteCoinOfCollection(req, res));
    }

    public getRouter(): Router {
        return this.router;
    }


}



