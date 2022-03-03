import { model, Schema } from 'mongoose';

const programSchema = new Schema({
    name: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    status: { type: Boolean, default: true }
});

export default model('Program', programSchema);