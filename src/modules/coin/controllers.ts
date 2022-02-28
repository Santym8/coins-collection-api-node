import {Request, Response} from 'express';

export class CoinControllers{

    public static getCoins(req:Request, res:Response){
        res.send('Coins of Collector');
    }

    public static addDeleteCoin(req:Request, res:Response){
        res.send('Coins Add Delete Coin');
    }

}