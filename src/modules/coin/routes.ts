import { Router } from "express";
import { CoinControllers } from './controllers'
class CoinRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get('/coins_of_collector', CoinControllers.getCoins)
        this.router.get('/add_delete', CoinControllers.addDeleteCoin)
    }

}

const coinRouter = new CoinRouter();
export default coinRouter.router;