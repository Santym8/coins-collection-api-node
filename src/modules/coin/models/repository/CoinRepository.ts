import { Service } from "typedi";
//----Models----------
import CoinModel from '../Coin';
import { IProgram } from "../interfaces/IProgram";

@Service()
export class CoinRepository{
    public async getAllCoins(){
        return await CoinModel.find().sort('coinNumber');
    }
}