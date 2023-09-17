import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/IUser";
import { EncryptionManagement } from "../utils/EncryptionManagement";
import { Container } from 'typedi';

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    coins: [{
        type: Schema.Types.ObjectId,
        ref: 'Coin'
    }]
})

userSchema.pre('save', async function (next) {
    const user = this;

    //If the password is not being changed, it should not be re-encrypted
    if (!user.isModified('password')) return next();

    //If the password is being changed, it should be re-encrypted
    try {
        const encryptionManagement = Container.get(EncryptionManagement);
        user.password = await encryptionManagement.encryptPassword(user.password);
    } catch (error) {
        console.log(error);
    }
    return next();
});



export default model<IUser>('User', userSchema);