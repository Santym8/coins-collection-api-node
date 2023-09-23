export class TokenResponse {
    private token: string;
    
    constructor(token:string) {
        this.token = token;
    }
    getToken() {
        return this.token;
    }
}