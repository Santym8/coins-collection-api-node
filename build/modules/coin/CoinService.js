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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinService = void 0;
const typedi_1 = require("typedi");
const CoinRepository_1 = require("./models/repository/CoinRepository");
const ProgramRepository_1 = require("./models/repository/ProgramRepository");
const UserRepository_1 = require("../user/models/repository/UserRepository");
let CoinService = class CoinService {
    constructor(coinRepository, programRepository, userRepository) {
        this.coinRepository = coinRepository;
        this.programRepository = programRepository;
        this.userRepository = userRepository;
    }
    getAllCoins(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCollection } = req.query;
            const idCollector = req.userId;
            const collector = yield this.userRepository.getUserById(idCollector);
            if (!collector) {
                return res.status(400).json({ message: 'The User does not exist' });
            }
            const coins = yield this.coinRepository.getAllCoinsOfProgram();
            if (!coins || coins.length == 0) {
                return res.status(400).json({ message: 'No coins' });
            }
            let coinsSend = [];
            for (let coin of coins) {
                if (coin.program.toString() == idCollection) {
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
            return res.status(200).json(coinsSend);
        });
    }
    addDeleteCoinOfCollection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCoin } = req.body;
            const idCollector = req.userId;
            const collector = yield this.userRepository.getUserById(idCollector);
            if (!collector) {
                return res.status(400).json({ 'message': 'The User does not exist' });
            }
            const coin = yield this.coinRepository.getCoinById(idCoin);
            if (!coin) {
                return res.status(400).json({ 'message': 'The Coin does not exist' });
            }
            let action = "";
            let coinsOfCollector = collector.coins;
            let indexOfCoin = coinsOfCollector.indexOf(idCoin);
            if (indexOfCoin == -1) {
                coinsOfCollector.push(idCoin);
                action = 'Added';
            }
            else {
                coinsOfCollector.splice(indexOfCoin, 1);
                action = 'Removed';
            }
            this.userRepository.saveUserUpdated(collector);
            return res.status(200).json({ message: action });
        });
    }
    getPrograms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const programs = yield this.programRepository.getAllPrograms();
            res.status(200).json(programs);
        });
    }
};
CoinService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [CoinRepository_1.CoinRepository,
        ProgramRepository_1.ProgramRepository,
        UserRepository_1.UserRepository])
], CoinService);
exports.CoinService = CoinService;
