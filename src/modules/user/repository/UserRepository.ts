import { Service } from "typedi";
import UserModel from "../models/User";
import { IUser } from "../interfaces/IUser";
import { Document } from 'mongoose';


@Service()
export class UserRepository {

    public async createUser(dataNewUser: IUser): Promise<string | null> {
        let newUser = new UserModel(dataNewUser);
        let savedUser = await newUser.save()
            .catch((err: any) => {
                return null;
            });
        if (!savedUser) return null;
        return savedUser.id;
    }

    public async getUserByUsername(username: string) {
        return await UserModel.findOne({ username: username });
    }

    public async getUserById(id: string) {
        return await UserModel.findById(id);
    }

    public async saveUserUpdated(user: Document<unknown, any, IUser>) {
        await user.save();
    }


}