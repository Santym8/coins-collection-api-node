
import 'reflect-metadata';
import {Container} from 'typedi';

import express from 'express';
import * as dotenv from 'dotenv';
import { DataBase } from './config/conf.db.mongo';
import { Middlewares } from './Middleware';

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

    
    private addRouters(){
        this.app.use('/api/user', Container.get(UserController).router);
        this.app.use('/api/coin', Container.get(CoinController).router)
    }

    private config() {   
        dotenv.config(); 
        this.app.set('port', process.env.PORT || 3000);
        Middlewares.addMiddlewares(this.app);
        DataBase.configDataBase();
        this.addRouters()
    }


    //-------------Start----------------
    public start() {
        let port = this.app.get('port');
        this.app.listen(port, () => console.log('Server on port ', port))
    }
}
