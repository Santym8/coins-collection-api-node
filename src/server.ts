//-------Dependency Injection-----
import 'reflect-metadata';
import { Container } from 'typedi';

//----------Configurations----------
import express from 'express';
import * as dotenv from 'dotenv';
import { DataBase } from './config/data-base/db.mongo';

//------------Midlewares-----------
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

//------------Controllers--------
import { CoinsCollectorController } from './modules/coins-collector/CoinsCollectorController';
import { UserController } from './modules/user/UserController';
import { IController } from './utils/interfaces/IController';
import { PopulateDataBase } from './config/data-base/populate.data';
import { ProgramController } from './modules/program/ProgramController';
import { CoinController } from './modules/coin/CoinController';
import { JwtMiddleware } from './config/jwt/JwtMiddleware';
import { ErrorHandling } from './config/error-handling/ErrorHandling';





export class Server {

    private app: express.Application;

    private urlControllers: { url: string, controller: IController }[] = [
        { url: '/api/user', controller: Container.get<IController>(UserController) },
        { url: '/api/coin', controller: Container.get<IController>(CoinController) },
        { url: '/api/program', controller: Container.get<IController>(ProgramController) },
        { url: '/api/coins-collector', controller: Container.get<IController>(CoinsCollectorController) },
    ];

    constructor() {
        this.app = express();
        this.config();
    }

    //------------------------Config--------------------
    private addRouters() {
        this.app.get('/', (req, res) => res.send('WORKS!'));
        this.urlControllers.forEach(urlController => {
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

    private addErrorHandling() {
        this.app.use(Container.get(ErrorHandling).getErrorHandling());
    }

    private config() {
        dotenv.config();
        this.app.set('port', process.env.PORT || 3000);

        new DataBase().configDataBase();
        if (process.env.POPULATE == 'true') {
            new PopulateDataBase().populate();
        }

        this.addMiddlewares();
        this.addRouters()
        this.addErrorHandling();

    }


    //-------------Start----------------
    public start() {
        let port = this.app.get('port');
        this.app.listen(port, () => console.log('Server on port ', port))
    }
}
