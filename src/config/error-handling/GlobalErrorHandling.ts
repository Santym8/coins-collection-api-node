import { Service } from 'typedi';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';


@Service()
export class GlobalErrorHandling {
    public middleware = (req: Request, res: Response, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    }
}
