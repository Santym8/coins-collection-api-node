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
exports.UserController = void 0;
const User_1 = __importDefault(require("./models/User"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newUser = new User_1.default(req.body);
            yield newUser.save()
                .then(() => {
                const token = jsonwebtoken_1.default.sign({ _id: newUser.id }, 'collector-api', { expiresIn: 3600 });
                return res.status(200).json({ token });
            })
                .catch((err) => {
                console.log(err);
                return res.json({ errors: 'Error' });
            });
        });
    }
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.query;
            const user = yield User_1.default.findOne({ username: username, password: password });
            if (user) {
                const token = jsonwebtoken_1.default.sign({ _id: user.id }, 'collector-api', { expiresIn: 3600 });
                return res.json({ token });
            }
            return res.json({ message: 'Error' });
        });
    }
}
exports.UserController = UserController;
