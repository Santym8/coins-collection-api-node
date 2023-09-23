import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export class ValidationMiddleware {

    public validate() {
        return (req: Request, res: Response, next: any) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(422).json({ errors: errors.array() });
            next();
        }
    }

}
