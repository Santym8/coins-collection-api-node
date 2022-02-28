import { model, Schema } from 'mongoose';


const coinSchema = new Schema({
    collection: { type: String, ref: 'collection' },
    coinNumber: { type: Number, required: true },
    name: { type: String, required: true },
    year: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
    status: { type: Boolean, default: true }
})

export default model('Coin', coinSchema);