import { Request, Response } from 'express';
import { Service } from 'typedi';
import { CustomError } from './CustomError';

@Service()
export class ErrorHandling {

    public getErrorHandling() {
        return (err: Error, req: Request, res: Response, next: any) => {

            if(err instanceof CustomError){
                return res.status(err.getStatusCode()).send(err.message)
            }
            res.status(500).send(err)   
        }
    }
}
