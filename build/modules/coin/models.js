"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const collectionSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: Boolean, default: true }
});
const coinSchema = new mongoose_1.Schema({
    collection: { type: String, ref: 'collection' },
    coinNumber: { type: Number, required: true },
    name: { type: String, required: true },
    year: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
    status: { type: Boolean, default: true }
});
