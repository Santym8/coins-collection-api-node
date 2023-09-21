import { Service } from 'typedi';
import { Router, Request, Response } from "express";

import { IController } from '../../utils/interfaces/IController';
import { ProgramService } from './service/ProgramService';

@Service()
export class ProgramController implements IController {

    private router: Router;

    constructor(
        private readonly programService: ProgramService
    ) {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.get(
            '/',
            (req: Request, res: Response) => this.programService.getPrograms(req, res));
    }

    public getRouter(): Router {
        return this.router;
    }


}



