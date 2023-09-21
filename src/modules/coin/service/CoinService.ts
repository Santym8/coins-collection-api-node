import { Service } from "typedi";
import { Request, Response } from 'express';
import {CoinRepository} from '../repository/CoinRepository';

@Service()
export class CoinService{

    constructor(
        private readonly coinRepository: CoinRepository
    ){}

    public async getCoins(req: Request, res: Response){
        try {
            const programs = await this.coinRepository.getAllCoins();
            res.status(200).json(programs);
        } catch (error: any) {
            res.status(400).json({message: error.message});
        }
    }

}