import { Service } from "typedi";
import UserModel from "../models/User";
import { IUser } from "../interfaces/IUser";
import { Document } from 'mongoose';


@Service()
export class UserRepository {

    public async createUser(dataNewUser: IUser): Promise<string> {
        let newUser = new UserModel(dataNewUser);
        let savedUser = await newUser.save()
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

    public async userExists(username: string): Promise<boolean> {
        const user = await this.getUserByUsername(username);
        return user ? true : false;
    }


}