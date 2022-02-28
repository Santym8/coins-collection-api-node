
import express from 'express';
import userRouter from './modules/user/routes';  
import coinRouter from './modules/coin/routes';

export class Routes{
    public static addRoutes(app:express.Application) {
        app.use('/api/user', userRouter);
        app.use('/api/coin', coinRouter)
    }
}

