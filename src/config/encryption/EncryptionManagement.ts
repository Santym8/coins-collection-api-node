import { Service } from 'typedi';
import bcrypt from 'bcryptjs';

@Service()
export class EncryptionManagement {
    public async verifyPassword(password: string, encryptedPassword: string) {
        return await bcrypt.compare(password, encryptedPassword);
    }

    public async encryptPassword(password: string) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
}
