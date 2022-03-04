"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const programSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    status: { type: Boolean, default: true }
});
exports.default = (0, mongoose_1.model)('Program', programSchema);
