"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../user/models/User"));
const verifyToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers['x-access-token']) === null || _a === void 0 ? void 0 : _a.toString();
        if (!token)
            return res.json({ message: 'No token' });
        const id = jsonwebtoken_1.default.verify(token, 'collector-api');
        const user = User_1.default.findById(id);
        if (!user)
            return res.json({ message: 'User dose not exist' });
        next();
    }
    catch (error) {
        return res.json({ message: 'Unuthorized' });
    }
};
exports.verifyToken = verifyToken;
