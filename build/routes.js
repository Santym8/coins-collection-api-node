"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const routes_1 = __importDefault(require("./modules/user/routes"));
const routes_2 = __importDefault(require("./modules/coin/routes"));
class Routes {
    static addRoutes(app) {
        app.use('/api/user', routes_1.default);
        app.use('/api/coin', routes_2.default);
    }
}
exports.Routes = Routes;
