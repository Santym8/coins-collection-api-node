import { Types } from 'mongoose';

export interface IUser {
    username: string;
    password: string;
    email: string;
    coins: Types.ObjectId;
}