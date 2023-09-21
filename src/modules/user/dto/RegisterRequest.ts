export class RegisterRequest{
    private username: string;
    private password: string;
    private email: string;

    constructor(username: string, password: string, email: string){
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public getUsername(): string {
        return this.username;
    }

    public getPassword(): string {
        return this.password;
    }

    public getEmail(): string {
        return this.email;
    }
}