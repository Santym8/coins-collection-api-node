import { Service } from "typedi";
//----Models----------
import UserModel from "../User";
import { IUser } from "../interfaces/IUser";

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


}