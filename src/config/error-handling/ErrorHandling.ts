import { Request, Response } from 'express';
import { Service } from 'typedi';
import { CustomError } from './CustomError';
import { ErrorResponse } from './ErrorResponse';
import { ValidationError } from 'class-validator';

@Service()
export class ErrorHandling {

    public getErrorHandling() {
        return (err: Error, req: Request, res: Response, next: any) => {

            if (err instanceof CustomError) {
                return res
                    .status(err.getStatusCode())
                    .send(ErrorResponse.fromCustomError(err, req.path))
            }

            if (err instanceof Array && err[0] instanceof ValidationError) {
                return res
                    .status(400)
                    .send(ErrorResponse.fromValidationError(err, req.path))
            }
            
            return res.status(500).send(ErrorResponse.fromError(err, req.path));
        }
    }
}
