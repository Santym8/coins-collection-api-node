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
import { IController } from './utils/interfaces/IController';
import { IUrlController } from './utils/interfaces/IUrlController';





export class Server {

    private app: express.Application;

    private urlsControllers: IUrlController[] = [
        { url: '/api/user', controller: Container.get<IController>(UserController) },
        { url: '/api/coin', controller: Container.get<IController>(CoinController) },
    ];

    constructor() {
        this.app = express();
        this.config();
    }

    //------------------------Config--------------------
    private addRouters() {
        this.urlsControllers.forEach(urlController => {
            this.app.use(urlController.url, urlController.controller.getRouter())
        });
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
