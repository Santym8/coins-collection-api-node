"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinControllers = void 0;
const Coin_1 = __importDefault(require("./models/Coin"));
const Program_1 = __importDefault(require("./models/Program"));
const User_1 = __importDefault(require("../user/models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class CoinControllers {
    static getId(req) {
        var _a;
        const token = (_a = req.headers['x-access-token']) === null || _a === void 0 ? void 0 : _a.toString();
        if (token) {
            return jsonwebtoken_1.default.verify(token, 'collector-api');
        }
        return null;
    }
    static getCoinsOfCollector(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCollection } = req.query;
            const idCollector = CoinControllers.getId(req);
            const collector = yield User_1.default.findById(idCollector);
            const coins = yield Coin_1.default.find();
            if (collector && coins.length != 0) {
                let coinsSend = [];
                for (let coin of coins) {
                    if (coin.program == idCollection) {
                        let coinSend = {
                            _id: coin.id,
                            coinNumber: coin.coinNumber,
                            program: coin.program,
                            name: coin.name,
                            year: coin.year,
                            image: coin.image,
                            description: coin.description,
                            found: false
                        };
                        if (collector.coins.indexOf(coin.id) != -1) {
                            coinSend.found = true;
                        }
                        coinsSend.push(coinSend);
                    }
                }
                return res.json(coinsSend);
            }
            return res.json({ message: 'Error' });
        });
    }
    static addDeleteCoinOfCollection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCoin } = req.body;
            const idCollector = CoinControllers.getId(req);
            const collector = yield User_1.default.findById(idCollector);
            if (collector) {
                let coins = collector.coins;
                let indexOfCoin = coins.indexOf(idCoin);
                if (indexOfCoin == -1) {
                    coins.push(idCoin);
                }
                else {
                    coins.splice(indexOfCoin, 1);
                }
                collector.save();
                return res.json(collector);
            }
            return res.json({ 'message': 'Error' });
        });
    }
    static getPrograms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const programs = yield Program_1.default.find();
            res.json(programs);
        });
    }
}
exports.CoinControllers = CoinControllers;
