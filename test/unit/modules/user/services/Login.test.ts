import { mock, instance, when, anything, anyString } from 'ts-mockito'
import { Request, Response } from 'express';
//Dependency Injection
import { UserService } from '../../../../../src/modules/user/service/UserSevice';
import { UserRepository } from '../../../../../src/modules/user/repository/UserRepository';
import { TokenManagement } from '../../../../../src/config/jwt/TokenManagement';
import { EncryptionManagement } from '../../../../../src/config/encryption/EncryptionManagement';
import { LoginRequest } from '../../../../../src/modules/user/dto/LoginRequest';
import { UserException } from '../../../../../src/modules/user/exception/UserException';



describe('User-Service-Login', () => {

    test('The user does not exist', async () => {
        //Given
        const mockedUserRepository: UserRepository = mock(UserRepository);
        when(mockedUserRepository.getUserByUsername(anyString())).thenResolve(null);

        const mockedTokenManagement: TokenManagement = mock(TokenManagement);
        const mockeEncryptionManagement: EncryptionManagement = mock(EncryptionManagement);

        const userService: UserService = new UserService(
            instance(mockedUserRepository),
            instance(mockedTokenManagement),
            instance(mockeEncryptionManagement)
        );

        const loginRequest: LoginRequest = new LoginRequest('name', 'password');

        //When: No username found
        const result = () => userService.login(loginRequest);

        //Then: 404
        expect(result).rejects.toThrow(UserException);
        expect(result).rejects.toThrow('The user does not exist');

    });

    test('Icorrect password', async () => {
        //Given
        const mockedUserRepository: UserRepository = mock(UserRepository);
        const fakeUser: any = { password: 'password' };
        when(mockedUserRepository.getUserByUsername(anyString())).thenResolve(fakeUser);

        const mockedTokenManagement: TokenManagement = mock(TokenManagement);

        const mockeEncryptionManagement: EncryptionManagement = mock(EncryptionManagement);
        when(mockeEncryptionManagement.verifyPassword(anyString(), anyString())).thenResolve(false);

        const userService: UserService = new UserService(
            instance(mockedUserRepository),
            instance(mockedTokenManagement),
            instance(mockeEncryptionManagement)
        );
        
        const loginRequest: LoginRequest = new LoginRequest('name', 'badPassword');

        //When
        const result = () => userService.login(loginRequest);
        
        //Then
        expect(result).rejects.toThrow(UserException);
        expect(result).rejects.toThrow('Incorrect password');

    });

    test('Login Ok', async () => {
        //Given
        const mockedUserRepository: UserRepository = mock(UserRepository);
        const fakeUser: any = { id: 'id', password: 'password' };
        when(mockedUserRepository.getUserByUsername(anyString())).thenResolve(fakeUser);

        const mockedTokenManagement: TokenManagement = mock(TokenManagement);
        when(mockedTokenManagement.newToken(anyString())).thenReturn('Token');

        const mockeEncryptionManagement: EncryptionManagement = mock(EncryptionManagement);
        when(mockeEncryptionManagement.verifyPassword(anyString(), anyString())).thenResolve(true);

        const userService: UserService = new UserService(
            instance(mockedUserRepository),
            instance(mockedTokenManagement),
            instance(mockeEncryptionManagement)
        );

        const loginRequest: LoginRequest = new LoginRequest('name', 'badPassword');

        //When
        const result = await userService.login(loginRequest);
        
        //Then
        expect(result).toBe('Token');
    });
});