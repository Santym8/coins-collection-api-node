import { Router } from "express";
import { CoinControllers } from './controllers'
import { verifyToken } from './middlewares';
class CoinRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get('/programs', verifyToken, CoinControllers.getPrograms);
        this.router.get('/coins_of_collector', verifyToken, CoinControllers.getCoinsOfCollector);
        this.router.put('/add_delete', verifyToken, CoinControllers.addDeleteCoinOfCollection);
    }

}

const coinRouter = new CoinRouter();
export default coinRouter.router;