"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const dataBase_1 = require("./dataBase");
const middleware_1 = require("./middleware");
const routes_1 = require("./routes");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
    }
    //------------------------Config--------------------
    config() {
        dotenv.config();
        this.app.set('port', process.env.PORT);
        middleware_1.Middlewares.addMiddlewares(this.app);
        dataBase_1.DataBase.configDataBase();
        routes_1.Routes.addRoutes(this.app);
    }
    //-------------Start----------------
    start() {
        let port = this.app.get('port');
        this.app.listen(port, () => console.log('Server on port ', port));
    }
}
const server = new Server();
server.start();
