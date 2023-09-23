import { Service } from 'typedi';
import { Request, Response } from 'express';
import { CoinRepository } from '../../coin/repository/CoinRepository';
import { UserRepository } from '../../user/repository/UserRepository';
import { IRequestWithUserId } from '../../../config/jwt/IRequestWithUserId';
import { UserException } from '../../user/exception/UserException';
import { CoinException } from '../../coin/exception/CoinException';
import { CoinCollector } from '../dto/CoinCollector';


@Service()
export class CoinsCollectorService {

    constructor(
        private readonly coinRepository: CoinRepository,
        private readonly userRepository: UserRepository
    ) { }


    public async getAllCoinsWithFounded(idCollector: string, idCollection: string):
        Promise<CoinCollector[]> {

        const collector = await this.userRepository.getUserById(idCollector);
        if (!collector) {
            throw new UserException('The User does not exist', 400);
        }

        // Todo: Filter by collection
        const coins = await this.coinRepository.getAllCoins();
        if (!coins || coins.length == 0) {
            throw new CoinException('There are not information about coins', 500);
        }

        let coinsSend: CoinCollector[] = [];
        coins.forEach(coin => {
            if (coin.program.toString() == idCollection) {
                let coinSend: CoinCollector = {
                    _id: coin.id,
                    coinNumber: coin.coinNumber,
                    program: coin.program.toString(),
                    name: coin.name,
                    year: coin.year,
                    image: coin.image,
                    found: false
                }
                if (collector.coins.indexOf(coin.id) != -1) {
                    coinSend.found = true;
                }
                coinsSend.push(coinSend);
            }
        });
        return coinsSend;

    }

    public async addOrDeleteCoinOfCollector(idCollector: string, idCoin: string) {

        const collector = await this.userRepository.getUserById(idCollector)
            .catch(err => {
                throw new UserException('The User does not exist', 400);
            });

        if (!collector) {
            throw new UserException('The User does not exist', 400);
        }

        const coin = await this.coinRepository.getCoinById(idCoin)
            .catch(err => {
                throw new CoinException('The Coin does not exist', 400);
            });

        if (!coin) {
            throw new CoinException('The Coin does not exist', 400);
        }

        let action = "";
        const coinsOfCollector: string[] = collector.coins as unknown as string[];
        const indexOfCoin = coinsOfCollector.indexOf(coin?.id);
        if (indexOfCoin == -1) {
            coinsOfCollector.push(idCoin);
            action = 'Added';
        } else {
            coinsOfCollector.splice(indexOfCoin, 1);
            action = 'Removed';
        }


        await this.userRepository.saveUserUpdated(collector)
            .catch(err => {
                throw new UserException('Error saving the user', 500);
            });


        return { message: action };
    }




}