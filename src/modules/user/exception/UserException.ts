import { CustomError } from "../../../config/error-handling/CustomError";

export class UserException extends CustomError {
    constructor(message: string, statusCode: number) {
        super(message, statusCode);
    }
}