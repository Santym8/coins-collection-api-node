import { Request, Response } from 'express';
import { Service } from 'typedi';
import { CustomError } from './CustomError';
import { ErrorResponse } from './ErrorResponse';

@Service()
export class ErrorHandling {

    public getErrorHandling() {
        return (err: Error, req: Request, res: Response, next: any) => {

            if (err instanceof CustomError) {
                return res
                    .status(err.getStatusCode())
                    .send(ErrorResponse.fromCustomError(err, req.path))
            }
            return res.status(500).send(ErrorResponse.fromError(err, req.path));
        }
    }
}
