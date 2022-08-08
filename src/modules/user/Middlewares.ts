import express from 'express';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
export class Middlewares {

    private static grantAccess = (req: Request, res: Response, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    }


    
    public static createUserMiddleware = [
        body('username').isLength({ min: 5, max: 15 }),
        body('password').isLength({ min: 5, max: 15 }),
        body('email').isEmail(),
        Middlewares.grantAccess
    ];

}
