import mongoose from "mongoose";

export class DataBase {

    public static configDataBase() {
        const MONGO_URI = 'mongodb://localhost/coins-collection';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL)
            .then(db => console.log('db is Connected'));
    }
}