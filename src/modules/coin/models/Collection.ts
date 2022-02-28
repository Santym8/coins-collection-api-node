import { model, Schema } from 'mongoose';

const collectionSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    status: { type: Boolean, default: true }
});

export default model('Collection', collectionSchema);