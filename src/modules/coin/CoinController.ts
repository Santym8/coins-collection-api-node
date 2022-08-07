import { Service } from 'typedi';
import { Router, Request, Response } from "express";
import { CoinService } from './CoinService'
import { verifyToken } from './middlewares';

@Service()
export class CoinController {

    public router: Router;

    constructor(private readonly coinService: CoinService) {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get('/programs', verifyToken, (req: Request, res: Response) => this.coinService.getPrograms(req, res));
        this.router.get('/coins_of_collector', verifyToken, (req: Request, res: Response) => this.coinService.getCoinsOfCollector(req, res));
        this.router.put('/add_delete', verifyToken, (req: Request, res: Response) => this.coinService.addDeleteCoinOfCollection(req, res));
    }

}



