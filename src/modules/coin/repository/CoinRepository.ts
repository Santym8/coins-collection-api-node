import { Service } from "typedi";
//----Models----------
import CoinModel from '../models/Coin';

@Service()
export class CoinRepository{

    public async getAllCoins(){
        return await CoinModel.find().sort('coinNumber');
    }
}