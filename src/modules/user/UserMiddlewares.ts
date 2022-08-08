import express from 'express';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import UserModel from './models/User';
export class UserMiddlewares {

    public static verifyToken = (req: express.Request, res: express.Response, next: any) => {
        try {
            const token = req.headers['x-access-token']?.toString();
            if (!token) return res.json({ message: 'No token' });
            const id = jwt.verify(token, 'collector-api');
            const user = UserModel.findById(id);
            if (!user) return res.json({ message: 'User dose not exist' });
            next();
        } catch (error) {
            return res.json({ message: 'Unuthorized' });
        }
    }

    // Checks if there are any problem
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
        UserMiddlewares.grantAccess
    ];

}
