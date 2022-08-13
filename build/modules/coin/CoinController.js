"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinController = void 0;
const typedi_1 = require("typedi");
const express_1 = require("express");
const CoinService_1 = require("./CoinService");
const CoinMiddlewares_1 = require("./CoinMiddlewares");
let CoinController = class CoinController {
    constructor(coinService, coinMiddlewares) {
        this.coinService = coinService;
        this.coinMiddlewares = coinMiddlewares;
        this.router = (0, express_1.Router)();
        this.addRoutes();
    }
    addRoutes() {
        this.router.get('/programs', this.coinMiddlewares.grantAccess, (req, res) => this.coinService.getPrograms(req, res));
        this.router.get('/coins_of_collector', this.coinMiddlewares.grantAccess, (req, res) => this.coinService.getAllCoins(req, res));
        this.router.put('/add_delete', this.coinMiddlewares.grantAccess, (req, res) => this.coinService.addDeleteCoinOfCollection(req, res));
    }
    getRouter() {
        return this.router;
    }
};
CoinController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [CoinService_1.CoinService,
        CoinMiddlewares_1.CoinMiddlewares])
], CoinController);
exports.CoinController = CoinController;
