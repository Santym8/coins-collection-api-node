"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const middlewares_1 = require("./middlewares");
class CoinRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.addRoutes();
    }
    addRoutes() {
        this.router.get('/programs', middlewares_1.verifyToken, controllers_1.CoinControllers.getPrograms);
        this.router.get('/coins_of_collector', middlewares_1.verifyToken, controllers_1.CoinControllers.getCoinsOfCollector);
        this.router.put('/add_delete', middlewares_1.verifyToken, controllers_1.CoinControllers.addDeleteCoinOfCollection);
    }
}
const coinRouter = new CoinRouter();
exports.default = coinRouter.router;
