import { mock, instance, when, anything, anyString } from 'ts-mockito'
import { Request, Response } from 'express';
//Dependency Injection
import { UserService } from '../../../../src/modules/user/service/UserSevice';
import { UserRepository } from '../../../../src/modules/user/repository/UserRepository';
import { TokenManagement } from '../../../../src/modules/user/utils/TokenManagement';
import { EncryptionManagement } from '../../../../src/modules/user/utils/EncryptionManagement';



describe('User-Service-Login', () => {

    test('Invalid user information', async () => {
        //Given
        let mockedUserRepository: UserRepository = mock(UserRepository);
        let mockedTokenManagement: TokenManagement = mock(TokenManagement);
        let mockeEncryptionManagement: EncryptionManagement = mock(EncryptionManagement);

        let userService: UserService = new UserService(
            instance(mockedUserRepository),
            instance(mockedTokenManagement),
            instance(mockeEncryptionManagement)
        );

        //When: Request has Empty fields
        let request: Partial<Request> = { query: {} };
        let response: Partial<Response> = {
            json: jest.fn()
        };
        response['status'] = jest.fn().mockReturnValue(response);

        //Then: 422
        await userService.login(request as Request, response as Response);
        expect(response.status).toBeCalledWith(422);

    });

    test('The user does not exist', async () => {
        //Given
        let mockedUserRepository: UserRepository = mock(UserRepository);
        when(mockedUserRepository.getUserByUsername(anyString())).thenResolve(null);

        let mockedTokenManagement: TokenManagement = mock(TokenManagement);
        let mockeEncryptionManagement: EncryptionManagement = mock(EncryptionManagement);

        let userService: UserService = new UserService(
            instance(mockedUserRepository),
            instance(mockedTokenManagement),
            instance(mockeEncryptionManagement)
        );

        //When: No username found
        let request: Partial<Request> = {
            query: {
                username: 'name',
                password: 'password'
            }
        };
        let response: Partial<Response> = {
            json: jest.fn()
        };
        response['status'] = jest.fn().mockReturnValue(response);

        //Then: 404
        await userService.login(request as Request, response as Response);
        expect(response.status).toBeCalledWith(404);

    });

    test('Icorrect password', async () => {
        //Given
        let mockedUserRepository: UserRepository = mock(UserRepository);
        let fakeUser: any = { password: 'password' };
        when(mockedUserRepository.getUserByUsername(anyString())).thenResolve(fakeUser);

        let mockedTokenManagement: TokenManagement = mock(TokenManagement);

        let mockeEncryptionManagement: EncryptionManagement = mock(EncryptionManagement);
        when(mockeEncryptionManagement.verifyPassword(anyString(), anyString())).thenResolve(false);

        let userService: UserService = new UserService(
            instance(mockedUserRepository),
            instance(mockedTokenManagement),
            instance(mockeEncryptionManagement)
        );

        //When: Icorrect password
        let request: Partial<Request> = {
            query: {
                username: 'name',
                password: 'password'
            }
        };
        let response: Partial<Response> = {
            json: jest.fn()
        };
        response['status'] = jest.fn().mockReturnValue(response);

        //Then: 401
        await userService.login(request as Request, response as Response);
        expect(response.status).toBeCalledWith(401);
    });

    test('Login Ok', async () => {
        //Given
        let mockedUserRepository: UserRepository = mock(UserRepository);
        let fakeUser: any = { id: 'id', password: 'password' };
        when(mockedUserRepository.getUserByUsername(anyString())).thenResolve(fakeUser);

        let mockedTokenManagement: TokenManagement = mock(TokenManagement);
        when(mockedTokenManagement.newToken(anyString())).thenReturn('Token');

        let mockeEncryptionManagement: EncryptionManagement = mock(EncryptionManagement);
        when(mockeEncryptionManagement.verifyPassword(anyString(), anyString())).thenResolve(true);

        let userService: UserService = new UserService(
            instance(mockedUserRepository),
            instance(mockedTokenManagement),
            instance(mockeEncryptionManagement)
        );

        //When: name and password are ok
        let request: Partial<Request> = {
            query: {
                username: 'name',
                password: 'password'
            }
        };
        let response: Partial<Response> = {
            json: jest.fn()
        };
        response['status'] = jest.fn().mockReturnValue(response);

        //Then: 200
        await userService.login(request as Request, response as Response);
        expect(response.status).toBeCalledWith(200);
    });
});