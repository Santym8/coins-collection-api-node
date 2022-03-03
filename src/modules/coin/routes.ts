import { Router } from "express";
import { CoinControllers } from './controllers'
class CoinRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get('/programs', CoinControllers.getPrograms);
        this.router.get('/coins_of_collector', CoinControllers.getCoinsOfCollector);
        this.router.put('/add_delete', CoinControllers.addDeleteCoinOfCollection);
    }

}

const coinRouter = new CoinRouter();
export default coinRouter.router;