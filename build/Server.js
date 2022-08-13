"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
//-------Dependency Injection-----
require("reflect-metadata");
const typedi_1 = require("typedi");
//----------Configurations----------
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const db_mongo_1 = require("./config/db.mongo");
//------------Midlewares-----------
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
//------------Controllers--------
const CoinController_1 = require("./modules/coin/CoinController");
const UserController_1 = require("./modules/user/UserController");
class Server {
    constructor() {
        this.urlsControllers = [
            { url: '/api/user', controller: typedi_1.Container.get(UserController_1.UserController) },
            { url: '/api/coin', controller: typedi_1.Container.get(CoinController_1.CoinController) },
        ];
        this.app = (0, express_1.default)();
        this.config();
    }
    //------------------------Config--------------------
    addRouters() {
        this.urlsControllers.forEach(urlController => {
            this.app.use(urlController.url, urlController.controller.getRouter());
        });
    }
    addMiddlewares() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
        this.app.use((0, compression_1.default)());
        this.app.use((0, cors_1.default)());
    }
    config() {
        dotenv.config();
        this.app.set('port', process.env.PORT || 3000);
        db_mongo_1.DataBase.configDataBase();
        this.addMiddlewares();
        this.addRouters();
    }
    //-------------Start----------------
    start() {
        let port = this.app.get('port');
        this.app.listen(port, () => console.log('Server on port ', port));
    }
}
exports.Server = Server;
