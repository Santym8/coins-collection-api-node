import { Service } from "typedi";
//----Models----------
import ProgramModel from '../Program'

@Service()
export class ProgramRepository{

    public async getAllPrograms(){
        console.log(await ProgramModel.find())
        return await ProgramModel.find();
    }
}