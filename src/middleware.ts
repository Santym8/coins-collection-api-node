import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';


export class Middlewares{

    public static addMiddlewares(app:express.Application) {
        app.use(morgan('dev'));
        app.use(helmet());
        app.use(express.json());
        app.use(compression());
        app.use(cors());
    }
}
