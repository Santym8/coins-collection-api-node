import { mock, instance, when, anything, anyString } from 'ts-mockito'
import { Request, Response } from 'express';
//Dependency Injection
import { UserService } from '../../../../src/modules/user/service/UserSevice';
import { UserRepository } from '../../../../src/modules/user/repository/UserRepository';
import { TokenManagement } from '../../../../src/modules/user/utils/TokenManagement';
import { EncryptionManagement } from '../../../../src/modules/user/utils/EncryptionManagement';



describe('User-Service-CreateUser', () => {

    test('Invalid user information', async () => {
        //Given
        let mockedUserRepository: UserRepository = mock(UserRepository);
        when(mockedUserRepository.createUser(anything())).thenResolve(null);

        let mockedTokenManagement: TokenManagement = mock(TokenManagement);
        let mockeEncryptionManagement: EncryptionManagement = mock(EncryptionManagement);
        let userService: UserService = new UserService(
            instance(mockedUserRepository),
            instance(mockedTokenManagement),
            instance(mockeEncryptionManagement)
        );

        //When: Request has invalid user information
        let request: Partial<Request> = {};
        let response: Partial<Response> = {
            json: jest.fn()
        };
        response['status'] = jest.fn().mockReturnValue(response);

        //Then: Error
        await userService.createUser(request as Request, response as Response);
        expect(response.status).toBeCalledWith(422);

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

        //When: Request has no problem
        let request: Partial<Request> = {};
        let response: Partial<Response> = {
            json: jest.fn()
        };
        response['status'] = jest.fn().mockReturnValue(response);

        //Then: Ok
        await userService.createUser(request as Request, response as Response);
        expect(response.status).toBeCalledWith(200);

    });


});