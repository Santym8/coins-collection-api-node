import { Service } from 'typedi';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CoinRepository } from './models/repository/CoinRepository';
import { ProgramRepository } from './models/repository/ProgramRepository';
import { UserRepository } from '../user/models/repository/UserRepository';


@Service()
export class CoinService {

    constructor(
        private readonly coinRepository:CoinRepository,
        private readonly programRepository:ProgramRepository ,
        private readonly userRepository:UserRepository
        ){}



    private static getId(req: Request) {
        const token = req.headers['x-access-token']?.toString();
        if (token) {
            return jwt.verify(token, 'collector-api');
        }
        return null
    }

    public async getCoinsOfCollector(req: Request, res: Response) {
        const { idCollection } = req.query;
        const idCollector = CoinService.getId(req);

        const collector = await this.userRepository.getUserById(idCollector as string);
        const coins = await this.coinRepository.getAllCoins();
        if (collector && coins.length != 0) {
            let coinsSend = [];
            for (let coin of coins) {
                if (coin.program.toString() == idCollection) {
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

    public async addDeleteCoinOfCollection(req: Request, res: Response) {
        const { idCoin } = req.body;
        const idCollector = CoinService.getId(req);
        const collector = await this.userRepository.getUserById(idCollector as string);
        if (collector) {
            let coins: string[] = collector.coins as unknown as  string[];
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

    public  async getPrograms(req: Request, res: Response) {
        const programs = this.programRepository.getAllPrograms();
        res.json(programs);
    }



}