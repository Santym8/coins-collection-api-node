import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginRequest {
    @IsNotEmpty({ message: 'Username must not be empty' })
    @IsString({ message: 'Username must be a string' })
    @Length(4, 20, { message: 'Username must be between 4 and 20 characters long' })
    private username: string;

    @IsNotEmpty({ message: 'Password must not be empty' })
    @IsString({ message: 'Password must be a string' })
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters long' })
    private password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    public getUsername(): string {
        return this.username;
    }

    public getPassword(): string {
        return this.password;
    }

    public static fromBody(body: any): LoginRequest {
        return new LoginRequest(
            body.username,
            body.password
        );
    }

}