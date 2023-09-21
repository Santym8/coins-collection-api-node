import { model, Schema } from 'mongoose';
import { ICoin } from '../interface/ICoin';

const coinSchema = new Schema<ICoin>({
    program: { type: Schema.Types.ObjectId, ref: 'Program' },
    coinNumber: { type: Number, required: true },
    name: { type: String, required: true },
    year: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
    status: { type: Boolean, default: true }
})

export default model<ICoin>('Coin', coinSchema);