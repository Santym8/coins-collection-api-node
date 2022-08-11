import { NextFunction, Request, Response } from 'express';
import { mock, instance, when, anyString } from 'ts-mockito'


//Dependency Injection
import { UserRepository } from '../../../../src/modules/user/models/repository/UserRepository';
import { UserMiddlewares } from '../../../../src/modules/user/UserMiddlewares';
import { TokenManagement } from '../../../../src/modules/user/utils/TokenManagement';
import { IRequestWithUserId } from '../../../../src/modules/user/utils/IRequestWithUserId';


describe('User-Middlewares-VerifyToken', () => {

    test('No access token', async () => {
        //Given
        let mockedUserRepository: UserRepository = mock(UserRepository);
        let mockedTokenManagement: TokenManagement = mock(TokenManagement);
        let userMiddlewares: UserMiddlewares = new UserMiddlewares(
            instance(mockedUserRepository),
            instance(mockedTokenManagement)
        );

        //When: Request has no header x-access-token
        let request: Partial<Request> = {};
        let response: Partial<Response> = {
            json: jest.fn()
        };
        let nextFunction: NextFunction = jest.fn();

        //Then: Unuthorized
        await userMiddlewares.verifyToken(request as Request, response as Response, nextFunction);
        expect(response.json).toBeCalledWith({ message: 'Unuthorized' });
    });

    test('Empty access token', async () => {
        //Given
        let mockedUserRepository: UserRepository = mock(UserRepository);
        let mockedEncryptor: TokenManagement = mock(TokenManagement);
        let userMiddlewares: UserMiddlewares = new UserMiddlewares(
            instance(mockedUserRepository),
            instance(mockedEncryptor)
        );

        //When: Request has an empty x-access-token
        let request: Partial<Request> = {
            headers: { 'x-access-token': '' }
        };
        let response: Partial<Response> = {
            json: jest.fn()
        };
        let nextFunction: NextFunction = jest.fn();

        //Then: No token
        await userMiddlewares.verifyToken(request as Request, response as Response, nextFunction);
        expect(response.json).toBeCalledWith({ message: 'No token' });
    });

    test('User does not exist', async () => {
        //Given
        let mockedEncryptor: TokenManagement = mock(TokenManagement);
        when(mockedEncryptor.verifyToken(anyString())).thenReturn('valid_token');

        let mockedUserRepository: UserRepository = mock(UserRepository);
        when(mockedUserRepository.getUserById(anyString())).thenResolve(null);

        let userMiddlewares: UserMiddlewares = new UserMiddlewares(
            instance(mockedUserRepository),
            instance(mockedEncryptor)
        );

        //When: Request has an empty x-access-token
        let request: Partial<Request> = {
            headers: { 'x-access-token': 'fsdf' }
        };
        let response: Partial<Response> = {
            json: jest.fn()
        };
        let nextFunction: NextFunction = jest.fn();

        //Then: No token
        await userMiddlewares.verifyToken(request as Request, response as Response, nextFunction as NextFunction);
        expect(response.json).toBeCalledWith({ message: 'User does not exist' });

    });

    test('Athorized', async () => {
        //Given
        let mockedUserRepository: UserRepository = mock(UserRepository);
        when(mockedUserRepository.getUserById(anyString())).thenResolve({} as any);

        let mockedEncryptor: TokenManagement = mock(TokenManagement);
        when(mockedEncryptor.verifyToken(anyString())).thenReturn('valid id');

        let userMiddlewares: UserMiddlewares = new UserMiddlewares(
            instance(mockedUserRepository),
            instance(mockedEncryptor)
        );

        //When: Request has good token
        let request: Partial<Request> = {
            headers: { 'x-access-token': 'good_token' }
        };
        let response: Partial<Response> = {
            json: jest.fn()
        };
        let nextFunction: NextFunction = jest.fn();
        //Then: User does not exist
        await userMiddlewares.verifyToken(request as IRequestWithUserId, response as Response, nextFunction);
        expect(nextFunction).toBeCalledTimes(1);
    });
});