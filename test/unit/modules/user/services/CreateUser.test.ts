import { mock, instance, when, anything, anyString } from 'ts-mockito'
import { Request, Response } from 'express';
//Dependency Injection
import { UserService } from '../../../../../src/modules/user/service/UserSevice';
import { UserRepository } from '../../../../../src/modules/user/repository/UserRepository';
import { TokenManagement } from '../../../../../src/config/jwt/TokenManagement';
import { EncryptionManagement } from '../../../../../src/config/encryption/EncryptionManagement';
import { RegisterRequest } from '../../../../../src/modules/user/dto/RegisterRequest';
import { UserException } from '../../../../../src/modules/user/exception/UserException';



describe('User-Service-CreateUser', () => {



    test('The user already exists', async () => {
        //Given
        const mockedUserRepository: UserRepository = mock(UserRepository);
        when(mockedUserRepository.getUserByUsername(anyString())).thenResolve({} as any);

        const mockedTokenManagement: TokenManagement = mock(TokenManagement);
        const mockeEncryptionManagement: EncryptionManagement = mock(EncryptionManagement);

        const userService: UserService = new UserService(
            instance(mockedUserRepository),
            instance(mockedTokenManagement),
            instance(mockeEncryptionManagement)
        );

        const registerRequest = new RegisterRequest('name', 'password', 'email');

        //When
        const result = () => userService.createUser(registerRequest);

        //Then
        expect(result).rejects.toThrow(UserException);
        expect(result).rejects.toThrow('The user already exists');

    });

    test('The email already exists', async () => {
        //Given
        const mockedUserRepository: UserRepository = mock(UserRepository);
        when(mockedUserRepository.getUserByEmail(anyString())).thenResolve({} as any);

        const mockedTokenManagement: TokenManagement = mock(TokenManagement);
        const mockeEncryptionManagement: EncryptionManagement = mock(EncryptionManagement);

        const userService: UserService = new UserService(
            instance(mockedUserRepository),
            instance(mockedTokenManagement),
            instance(mockeEncryptionManagement)
        );

        const registerRequest = new RegisterRequest('name', 'password', 'email');

        //When
        const result = () => userService.createUser(registerRequest);

        //Then
        expect(result).rejects.toThrow(UserException);
        expect(result).rejects.toThrow('The email already exists');

    });


    test('Error creating user', async () => {
        //Given
        const mockedUserRepository: UserRepository = mock(UserRepository);
        when(mockedUserRepository.createUser(anything())).thenReject(new Error('Error creating user'));

        const mockedTokenManagement: TokenManagement = mock(TokenManagement);
        const mockeEncryptionManagement: EncryptionManagement = mock(EncryptionManagement);

        const userService: UserService = new UserService(
            instance(mockedUserRepository),
            instance(mockedTokenManagement),
            instance(mockeEncryptionManagement)
        );

        const registerRequest = new RegisterRequest('name', 'password', 'email');

        //When
        const result = () => userService.createUser(registerRequest);

        //Then
        expect(result).rejects.toThrow(UserException);
        expect(result).rejects.toThrow('Error creating user');

    });



    test('Ok', async () => {
        //Given
        let mockedUserRepository: UserRepository = mock(UserRepository);
        when(mockedUserRepository.createUser(anything())).thenResolve('valid ID');

        let mockedTokenManagement: TokenManagement = mock(TokenManagement);
        when(mockedTokenManagement.newToken(anyString())).thenReturn('valid Token')

        let mockeEncryptionManagement: EncryptionManagement = mock(EncryptionManagement);
        let userService: UserService = new UserService(
            instance(mockedUserRepository),
            instance(mockedTokenManagement),
            instance(mockeEncryptionManagement)
        );

        const registerRequest = new RegisterRequest('name', 'password', 'email');
        //When: Request has invalid user information

        const result = await userService.createUser(registerRequest);

        //Then: Ok
        expect(result).toBe('valid Token');

    });


});