import { Service } from "typedi";
//----Models----------
import ProgramModel from '../model/Program'
import { IProgram } from "../interface/IProgram";

@Service()
export class ProgramRepository{

    public async getAllPrograms(){
        return await ProgramModel.find();
    }

    public async saveProgram(program: IProgram){
        return await new ProgramModel(program).save();
    }
}