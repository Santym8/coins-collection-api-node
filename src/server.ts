//-------Dependency Injection-----
import 'reflect-metadata';
import { Container } from 'typedi';

//----------Configurations----------
import express from 'express';
import * as dotenv from 'dotenv';
import { DataBase } from './config/db.mongo';

//------------Midlewares-----------
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

//------------Controllers--------
import { CoinController } from './modules/coin/CoinController';
import { UserController } from './modules/user/UserController';



export class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    //------------------------Config--------------------
    private addRouters() {
        this.app.use('/api/user', Container.get(UserController).router);
        this.app.use('/api/coin', Container.get(CoinController).router)
    }

    private addMiddlewares() {
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(compression());
        this.app.use(cors());

    }

    private config() {
        dotenv.config();
        this.app.set('port', process.env.PORT || 3000);
        DataBase.configDataBase();
        this.addMiddlewares();
        this.addRouters()
    }


    //-------------Start----------------
    public start() {
        let port = this.app.get('port');
        this.app.listen(port, () => console.log('Server on port ', port))
    }
}
