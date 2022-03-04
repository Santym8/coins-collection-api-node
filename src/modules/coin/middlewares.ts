import express from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../user/models/User';

export const verifyToken = (req: express.Request, res: express.Response, next: any) => {
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

