"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const coinSchema = new mongoose_1.Schema({
    program: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Program' },
    coinNumber: { type: Number, required: true },
    name: { type: String, required: true },
    year: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
    status: { type: Boolean, default: true }
});
exports.default = (0, mongoose_1.model)('Coin', coinSchema);
