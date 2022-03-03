import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    coins: [{
        type: Schema.Types.ObjectId,
        ref:'Coin'
    }]
})

export default model('User', userSchema);