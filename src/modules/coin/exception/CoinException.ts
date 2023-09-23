import { CustomError } from "../../../config/error-handling/CustomError";

export class CoinException extends CustomError {
    constructor(message: string, status: number) {
        super(message, status);
    }
}