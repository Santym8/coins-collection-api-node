import {
    IsString,
    Length,
    IsEmail,
    IsNotEmpty
} from 'class-validator';


export class RegisterRequest {
    @Length(4, 20, { message: 'Username must be between 4 and 20 characters long' })
    @IsString({ message: 'Username must be a string' })
    @IsNotEmpty({ message: 'Username must not be empty' })
    private username: string;

    @Length(8, 20, { message: 'Password must be between 8 and 20 characters long' })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password must not be empty' })
    private password: string;

    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsString({ message: 'Email must be a string' })
    private email: string;

    constructor(username: string, password: string, email: string) {
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

    public static fromBody(body: any): RegisterRequest {
        return new RegisterRequest(
            body.username,
            body.password,
            body.email
        );
    }
}