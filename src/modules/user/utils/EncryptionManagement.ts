import { Service } from 'typedi';
import bcrypt from 'bcryptjs';

@Service()
export class EncryptionManagement {
    public async verifyPassword(password: string, encryptedPassword: string) {
        return await bcrypt.compare(password, encryptedPassword);
    }
}
