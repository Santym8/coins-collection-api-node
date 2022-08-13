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
exports.UserService = void 0;
const typedi_1 = require("typedi");
const UserRepository_1 = require("./models/repository/UserRepository");
const TokenManagement_1 = require("./utils/TokenManagement");
const EncryptionManagement_1 = require("./utils/EncryptionManagement");
let UserService = class UserService {
    constructor(userRepository, tokenManagement, encryptionManagement) {
        this.userRepository = userRepository;
        this.tokenManagement = tokenManagement;
        this.encryptionManagement = encryptionManagement;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUserId = yield this.userRepository.createUser(req.body);
            if (!newUserId) {
                return res.status(422).json({ errors: 'Error' });
            }
            const token = this.tokenManagement.newToken(newUserId);
            return res.status(200).json({ token });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.query;
                if (username == undefined || password == undefined) {
                    return res.status(422).json({ message: 'Empty fields' });
                }
                const user = yield this.userRepository.getUserByUsername(username);
                if (!user) {
                    return res.status(404).json({ message: 'The user does not exist' });
                }
                const matchPassword = yield this.encryptionManagement.verifyPassword(password, user.password);
                if (!matchPassword) {
                    return res.status(401).json({ message: 'Incorrect password' });
                }
                const token = this.tokenManagement.newToken(user.id);
                return res.status(200).json({ token });
            }
            catch (error) {
                return res.json({ message: error.message });
            }
        });
    }
};
UserService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository,
        TokenManagement_1.TokenManagement,
        EncryptionManagement_1.EncryptionManagement])
], UserService);
exports.UserService = UserService;
