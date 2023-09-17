import { Types } from 'mongoose';


export interface ICoin {
    program: Types.ObjectId;
    coinNumber: Number;
    name: String;
    year: String;
    image: String;
    description?: String;
    status: Boolean;
}
