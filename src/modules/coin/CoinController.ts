import { Service } from 'typedi';
import { Router } from "express";
import { CoinService } from './CoinService'
import { verifyToken } from './middlewares';

@Service()
export class CoinController {

    public router: Router;

    constructor(private readonly coinService:CoinService) {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get('/programs', verifyToken, this.coinService.getPrograms);
        this.router.get('/coins_of_collector', verifyToken, this.coinService.getCoinsOfCollector);
        this.router.put('/add_delete', verifyToken, this.coinService.addDeleteCoinOfCollection);
    }

}



