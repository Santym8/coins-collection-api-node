import { Service } from 'typedi';
import { Request, Response } from 'express';

import { UserRepository } from '../repository/UserRepository';
import { TokenManagement } from '../../../config/jwt/TokenManagement';
import { EncryptionManagement } from '../../../config/encryption/EncryptionManagement';
import { IUser } from '../interfaces/IUser';
import { UserException } from '../exception/UserException';
import { LoginRequest } from '../dto/LoginRequest';
import { RegisterRequest } from '../dto/RegisterRequest';

@Service()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenManagement: TokenManagement,
        private readonly encryptionManagement: EncryptionManagement
    ) { }

    public async createUser(registerRequest: RegisterRequest): Promise<string> {
        const user:IUser = {
            username: registerRequest.getUsername(),
            password: registerRequest.getPassword(),
            email: registerRequest.getEmail()
        };   
        const newUserId = await this.userRepository.createUser(user);
        if (!newUserId) {
            throw new UserException('The user could not be created', 500);
        }
        const token = this.tokenManagement.newToken(newUserId);
        return token;
    }

    public async login(req:LoginRequest): Promise<string> {
       
        const user = await this.userRepository.getUserByUsername(req.getUsername());
        if (!user) {
            throw new UserException('The user does not exist', 404);
        }

        const matchPassword = await this.encryptionManagement
            .verifyPassword(req.getPassword(), user.password);

        if (!matchPassword) {
            throw new UserException('Incorrect password', 401);
        }

        const token = this.tokenManagement.newToken(user.id);
        return token;
    }
}
