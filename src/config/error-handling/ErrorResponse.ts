import { CustomError } from "./CustomError";

export class ErrorResponse {
    private error: string;
    private message: string;
    private statusCode: number;
    private path: string;
    private date: Date;

    constructor(error: string, message: string, statusCode: number, path: string, date: Date) {
        this.error = error;
        this.message = message;
        this.statusCode = statusCode;
        this.path = path;
        this.date = date;
    }

    public getError(): string {
        return this.error;
    }

    public getMessage(): string {
        return this.message;
    }

    public getStatusCode(): number {
        return this.statusCode;
    }

    public getPath(): string {
        return this.path;
    }

    public getDate(): Date {
        return this.date;
    }

    public setError(error: string): void {
        this.error = error;
    }

    public setMessage(message: string): void {
        this.message = message;
    }

    public setStatusCode(statusCode: number): void {
        this.statusCode = statusCode;
    }

    public setPath(path: string): void {
        this.path = path;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    public static fromError(error: Error, path: string): ErrorResponse {
        return new ErrorResponse(error.name, error.message, 500, path, new Date());
    }

    public static fromCustomError(error: CustomError, path: string): ErrorResponse {
        return new ErrorResponse(error.constructor.name, error.message, error.getStatusCode(), path, new Date());
    }
}