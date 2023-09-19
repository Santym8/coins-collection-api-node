import { Service } from 'typedi';
import { Request, Response } from 'express';

import { UserRepository } from '../repository/UserRepository';
import { TokenManagement } from '../utils/TokenManagement';
import { EncryptionManagement } from '../utils/EncryptionManagement';

@Service()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenManagement: TokenManagement,
        private readonly encryptionManagement: EncryptionManagement
    ) { }

    public async createUser(req: Request, res: Response) {
        const newUserId = await this.userRepository.createUser(req.body);
        if (!newUserId) {
            return res.status(422).json({ errors: 'Error' });
        }
        const token = this.tokenManagement.newToken(newUserId);
        return res.status(200).json({ token });
    }

    public async login(req: Request, res: Response) {
        const { username, password }: { username: string, password: string } = req.body;

        if (username == undefined || password == undefined) {
            return res.status(422).json({ message: 'Empty fields' });
        }

        const user = await this.userRepository.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'The user does not exist' });
        }

        const matchPassword = await this.encryptionManagement
            .verifyPassword(password, user.password);
            
        if (!matchPassword) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = this.tokenManagement.newToken(user.id);
        return res.status(200).json({ token });
    }
}
