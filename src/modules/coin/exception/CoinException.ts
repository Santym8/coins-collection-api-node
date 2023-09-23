export class CoinException extends Error {
    private status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }

    public getStatus(): number {
        return this.status;
    }
}