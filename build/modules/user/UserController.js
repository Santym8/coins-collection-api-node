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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const typedi_1 = require("typedi");
const express_1 = require("express");
const UserSevice_1 = require("./UserSevice");
const UserMiddlewares_1 = require("./UserMiddlewares");
let UserController = class UserController {
    constructor(userService, userMiddlewares) {
        this.userService = userService;
        this.userMiddlewares = userMiddlewares;
        this.router = (0, express_1.Router)();
        this.addRoutes();
    }
    addRoutes() {
        this.router.get('/', (req, res) => this.userService.login(req, res));
        this.router.post('/create', this.userMiddlewares.createUserMiddleware, (req, res) => this.userService.createUser(req, res));
    }
    getRouter() {
        return this.router;
    }
};
UserController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [UserSevice_1.UserService,
        UserMiddlewares_1.UserMiddlewares])
], UserController);
exports.UserController = UserController;
