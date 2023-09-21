import { Service } from 'typedi';
import { Request, Response } from 'express';
import { CoinRepository } from '../repository/CoinRepository';
import { UserRepository } from '../../user/repository/UserRepository';
import { IRequestWithUserId } from '../../user/utils/IRequestWithUserId';


@Service()
export class CoinsCollectorService {

    constructor(
        private readonly coinRepository: CoinRepository,
        private readonly userRepository: UserRepository
    ) { }


    public async getAllCoinsWithFounded(req: IRequestWithUserId, res: Response) {
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

    public async addOrDeleteCoinOfCollector(req: IRequestWithUserId, res: Response) {
        const { idCoin } = req.body;
        const idCollector = req.userId;

        const collector = await this.userRepository.getUserById(idCollector as string);

        if (!collector) {
            return res.status(400).json({ 'message': 'The User does not exist' })
        }

        const coin = await this.coinRepository.getCoinById(idCoin);
        if (!coin) {
            return res.status(400).json({ 'message': 'The Coin does not exist' })
        }

        let action = "";
        let coinsOfCollector: string[] = collector.coins as unknown as string[];
        let indexOfCoin = coinsOfCollector.indexOf(idCoin);
        if (indexOfCoin == -1) {
            coinsOfCollector.push(idCoin);
            action = 'Added';
        } else {
            coinsOfCollector.splice(indexOfCoin, 1);
            action = 'Removed';
        }

        this.userRepository.saveUserUpdated(collector);
        return res.status(200).json({ message: action });
    }

    


}