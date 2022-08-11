import { Service } from 'typedi';
import { verify, sign } from 'jsonwebtoken';

@Service()
export class TokenManagement {

    public verifyToken(token: string): string {
        return verify(token, 'collector-api') as string;
    }

    public newToken(userId: string): string {
        return sign({ _id: userId }, 'collector-api', { expiresIn: 3600 })
    }

}
