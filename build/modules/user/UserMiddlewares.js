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
exports.UserMiddlewares = void 0;
const typedi_1 = require("typedi");
const express_validator_1 = require("express-validator");
const UserRepository_1 = require("./models/repository/UserRepository");
const TokenManagement_1 = require("./utils/TokenManagement");
let UserMiddlewares = class UserMiddlewares {
    constructor(userRepository, encryptor) {
        this.userRepository = userRepository;
        this.encryptor = encryptor;
        this.verifyToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers['x-access-token'];
                if (!token)
                    return res.status(401).json({ message: 'No token' });
                const id = this.encryptor.verifyToken(token);
                const user = yield this.userRepository.getUserById(id);
                if (!user)
                    return res.status(401).json({ message: 'User does not exist' });
                req.userId = id;
                next();
            }
            catch (error) {
                return res.status(401).json({ message: 'Unuthorized' });
            }
        });
        // Checks if there are any problem
        this.grantAccess = (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty())
                return res.status(422).json({ errors: errors.array() });
            next();
        };
        this.createUserMiddleware = [
            (0, express_validator_1.body)('username').isLength({ min: 5, max: 15 }),
            (0, express_validator_1.body)('password').isLength({ min: 5, max: 15 }),
            (0, express_validator_1.body)('email').isEmail(),
            this.grantAccess
        ];
    }
};
UserMiddlewares = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository,
        TokenManagement_1.TokenManagement])
], UserMiddlewares);
exports.UserMiddlewares = UserMiddlewares;
