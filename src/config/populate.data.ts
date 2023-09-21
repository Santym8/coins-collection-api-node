import { ICoin } from '../modules/coin/interface/ICoin';
import { IProgram } from '../modules/program/interface/IProgram';
import { CoinRepository } from '../modules/coin/repository/CoinRepository';
import { ProgramRepository } from '../modules/program/repository/ProgramRepository';

import coinParks from '../../data/parks.json';
import coinStates from '../../data/states.json';
import coinWomen from '../../data/women.json';
import programs from '../../data/programs.json';

import { Types } from 'mongoose';

export class PopulateDataBase{

    public populate(){
        console.log('Populating data...');
        this.populatePrograms();
        this.populateCoins();
        console.log('Data populated');
    }

    private populatePrograms(){
        const programRepository = new ProgramRepository();
        programs.forEach(async (program: IProgram) => {
            await programRepository.saveProgram(program);
        });
    }

    private populateCoins(){
        const coinRepository = new CoinRepository();
        
        coinParks.forEach(async value => {
            const coin: ICoin = {
                program: new Types.ObjectId(value.program),
                coinNumber: value.coinNumber,
                name: value.name,
                year: value.year,
                image: value.image,
                status: true
            };
            await coinRepository.saveCoin(coin);
        });

        coinStates.forEach(async value => {
            const coin: ICoin = {
                program: new Types.ObjectId(value.program),
                coinNumber: value.coinNumber,
                name: value.name,
                year: value.year,
                image: value.image,
                status: true
            };
            await coinRepository.saveCoin(coin);
        });

        coinWomen.forEach(async value => {
            const coin: ICoin = {
                program: new Types.ObjectId(value.program),
                coinNumber: value.coinNumber,
                name: value.name,
                year: value.year,
                image: value.image,
                status: true
            };
            await coinRepository.saveCoin(coin);
        });
    }

}