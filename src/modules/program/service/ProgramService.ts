import { Service } from "typedi";
import { Request, Response } from 'express';
import { ProgramRepository } from "../repository/ProgramRepository";

@Service()
export class ProgramService{

    constructor(
        private readonly programRepository: ProgramRepository
    ){}

    public async getPrograms() {
        const programs = await this.programRepository.getAllPrograms();
        return programs;
    }

}