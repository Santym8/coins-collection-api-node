import { model, Schema } from 'mongoose';
import { IProgram } from '../interfaces/IProgram';

const programSchema = new Schema<IProgram>({
    name: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    status: { type: Boolean, default: true }
});

export default model<IProgram>('Program', programSchema);