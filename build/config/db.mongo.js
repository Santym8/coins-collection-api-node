"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DataBase {
    static configDataBase() {
        let uri = process.env.MONGODB_URI || '';
        mongoose_1.default.connect(uri)
            .then(db => console.log('db is Connected'));
    }
}
exports.DataBase = DataBase;
