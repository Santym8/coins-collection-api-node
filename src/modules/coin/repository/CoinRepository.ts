import { Service } from "typedi";
//----Models----------
import CoinModel from '../model/Coin';
import { ICoin } from "../interface/ICoin";

@Service()
export class CoinRepository {

    public async getAllCoins() {
        return await CoinModel.find().sort('coinNumber');
    }

    public async getCoinById(id: string) {
        return await CoinModel.findById(id);
    }

    public async saveCoin(coin: ICoin) {
        return await new CoinModel(coin).save();
    }
}