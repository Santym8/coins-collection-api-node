import { Service } from 'typedi';
import { UserMiddlewares } from '../user/UserMiddlewares';


@Service()
export class CoinMiddlewares{

    constructor(private readonly userMiddlewares:UserMiddlewares){}

    public grantAccess = [
        this.userMiddlewares.verifyToken
    ]

    
}


