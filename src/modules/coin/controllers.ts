import { Request, Response } from 'express';
import CoinModel from './models/Coin';
import ProgramModel from './models/Program';
import UserModel from '../user/models/User';
import jwt from 'jsonwebtoken';

export class CoinControllers {

    private static getId(req: Request) {
        const token = req.headers['x-access-token']?.toString();
        if (token) {
            return jwt.verify(token, 'collector-api');
        }
        return null
    }

    public static async getCoinsOfCollector(req: Request, res: Response) {
        const { idCollection } = req.query;
        const idCollector = CoinControllers.getId(req);

        const collector = await UserModel.findById(idCollector);
        const coins = await CoinModel.find().sort('coinNumber');
        if (collector && coins.length != 0) {
            let coinsSend = [];
            for (let coin of coins) {
                if (coin.program == idCollection) {
                    let coinSend = {
                        _id: coin.id,
                        coinNumber: coin.coinNumber,
                        program: coin.program,
                        name: coin.name,
                        year: coin.year,
                        image: coin.image,
                        description: coin.description,
                        found: false
                    }
                    if (collector.coins.indexOf(coin.id) != -1) {
                        coinSend.found = true;
                    }
                    coinsSend.push(coinSend);
                }
            }
            return res.json(coinsSend);
        }
        return res.json({ message: 'Error' })
    }

    public static async addDeleteCoinOfCollection(req: Request, res: Response) {
        const { idCoin } = req.body;
        const idCollector = CoinControllers.getId(req);
        const collector = await UserModel.findById(idCollector);

        if (collector) {
            let coins: string[] = collector.coins;
            let indexOfCoin = coins.indexOf(idCoin);
            if (indexOfCoin == -1) {
                coins.push(idCoin);
            } else {
                coins.splice(indexOfCoin, 1);
            }
            collector.save();
            return res.json(collector);
        }
        return res.json({ 'message': 'Error' })

    }

    public static async getPrograms(req: Request, res: Response) {
        const programs = await ProgramModel.find();
        res.json(programs);
    }



}