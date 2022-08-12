import { Service } from 'typedi';
import { Request, Response } from 'express';
import { CoinRepository } from './models/repository/CoinRepository';
import { ProgramRepository } from './models/repository/ProgramRepository';
import { UserRepository } from '../user/models/repository/UserRepository';
import { IRequestWithUserId } from '../user/utils/IRequestWithUserId';


@Service()
export class CoinService {

    constructor(
        private readonly coinRepository: CoinRepository,
        private readonly programRepository: ProgramRepository,
        private readonly userRepository: UserRepository
    ) { }


    public async getAllCoins(req: IRequestWithUserId, res: Response) {
        const { idCollection } = req.query;
        const idCollector = req.userId;

        const collector = await this.userRepository.getUserById(idCollector as string);

        if (!collector) {
            return res.status(400).json({ message: 'The User does not exist' })
        }

        const coins = await this.coinRepository.getAllCoinsOfProgram();
        if (!coins || coins.length == 0) {
            return res.status(400).json({ message: 'No coins' })
        }

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
        return res.status(200).json(coinsSend);

    }

    public async addDeleteCoinOfCollection(req: IRequestWithUserId, res: Response) {
        const { idCoin } = req.body;
        const idCollector = req.userId;
        const collector = await this.userRepository.getUserById(idCollector as string);
        if (collector) {
            let coins: string[] = collector.coins as unknown as string[];
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

    public async getPrograms(req: Request, res: Response) {
        const programs = this.programRepository.getAllPrograms();
        res.json(programs);
    }



}