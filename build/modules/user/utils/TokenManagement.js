"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenManagement = void 0;
const typedi_1 = require("typedi");
const jsonwebtoken_1 = require("jsonwebtoken");
let TokenManagement = class TokenManagement {
    verifyToken(token) {
        return (0, jsonwebtoken_1.verify)(token, 'collector-api');
    }
    newToken(userId) {
        return (0, jsonwebtoken_1.sign)({ _id: userId }, 'collector-api', { expiresIn: 3600 });
    }
};
TokenManagement = __decorate([
    (0, typedi_1.Service)()
], TokenManagement);
exports.TokenManagement = TokenManagement;
