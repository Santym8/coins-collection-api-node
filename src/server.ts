
import express from 'express';
import mongoose from 'mongoose';
import { DataBase } from './dataBase';
import { Middlewares } from './middleware';
import { Routes } from './routes';


class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    //------------------------Config--------------------

    private config() {
        this.app.set('port', process.env.PORT || 3000);
        Middlewares.addMiddlewares(this.app);
        DataBase.configDataBase();
        Routes.addRoutes(this.app);

    }

    //-------------Start----------------
    public start() {
        let port = this.app.get('port');
        this.app.listen(port, () => console.log('Server on port ', port))
    }
}

const server = new Server();
server.start();
