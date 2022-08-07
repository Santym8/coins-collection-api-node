import { Service } from "typedi";
//----Models----------
import UserModel from "../User";
import { IUser } from "../interfaces/IUser";

@Service()
export class UserRepository{

    public createUser(req:any){
        return new UserModel(req.body);
    }

    public async getUserByUsername(username:string){
        return await UserModel.findOne({ username: username });
    }

    public async getUserById(id:string){
        return await UserModel.findById(id);
    }

   
}