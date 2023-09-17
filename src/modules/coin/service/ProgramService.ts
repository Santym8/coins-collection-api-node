import { Service } from "typedi";
import { Request, Response } from 'express';
import { ProgramRepository } from "../repository/ProgramRepository";

@Service()
export class ProgramService{

    constructor(
        private readonly programRepository: ProgramRepository
    ){}

    public async getPrograms(req: Request, res: Response) {
        const programs = await this.programRepository.getAllPrograms();
        res.status(200).json(programs);
    }

}