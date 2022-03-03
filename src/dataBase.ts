import mongoose from "mongoose";

export class DataBase {

    public static configDataBase() {
        let uri = process.env.MONGODB_URI || '';
        mongoose.connect(uri)
            .then(db => console.log('db is Connected'))
    }
}

