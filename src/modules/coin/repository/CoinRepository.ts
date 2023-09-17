import { Service } from "typedi";
//----Models----------
import CoinModel from '../models/Coin';
import { ICoin } from "../interfaces/ICoin";

@Service()
export class CoinRepository {
    public async getAllCoinsOfProgram() {
        return await CoinModel.find().sort('coinNumber');
    }

    public async getCoinById(id: string) {
        return await CoinModel.findById(id);
    }

    public async saveCoin(coin: ICoin) {
        return await new CoinModel(coin).save();
    }
}