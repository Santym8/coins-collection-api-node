import { Service } from "typedi";
import { Request, Response } from 'express';
import {CoinRepository} from '../repository/CoinRepository';

@Service()
export class CoinService{

    constructor(
        private readonly coinRepository: CoinRepository
    ){}

    public async getCoins(){
        return await this.coinRepository.getAllCoins();
    }

}