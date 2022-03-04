"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const express_validator_1 = require("express-validator");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.addRoutes();
    }
    addRoutes() {
        this.router.get('/', controllers_1.UserController.getUser);
        this.router.post('/create', (0, express_validator_1.body)('username').isLength({ min: 5, max: 15 }), (0, express_validator_1.body)('password').isLength({ min: 5, max: 15 }), (0, express_validator_1.body)('email').isEmail(), controllers_1.UserController.createUser);
    }
}
const userRoutes = new UserRouter();
exports.default = userRoutes.router;
