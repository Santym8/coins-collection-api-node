import { Service } from 'typedi';
import { verify } from 'jsonwebtoken';

@Service()
export class Encryptor {

    public verifyToken(token: string): string {
        return verify(token, 'collector-api') as string;
    }

}
