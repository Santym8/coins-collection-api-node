import { Service } from "typedi";
//----Models----------
import ProgramModel from '../models/Program'

@Service()
export class ProgramRepository{

    public async getAllPrograms(){
        return await ProgramModel.find();
    }
}