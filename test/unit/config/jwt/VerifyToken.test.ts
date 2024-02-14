import { NextFunction, Request, Response } from 'express';
import { mock, instance, when, anyString } from 'ts-mockito'
import { JwtMiddleware } from '../../../../src/config/jwt/JwtMiddleware';

//Dependency Injection
import { UserRepository } from '../../../../src/modules/user/repository/UserRepository';
import { TokenManagement } from '../../../../src/config/jwt/TokenManagement';
import { IRequestWithUserId } from '../../../../src/config/jwt/IRequestWithUserId';


describe('JwtMiddleware', () => {

    test('No access token', async () => {
        //Given
        let mockedUserRepository: UserRepository = mock(UserRepository);
        let mockedEncryptor: TokenManagement = mock(TokenManagement);
        const underTest: JwtMiddleware = new JwtMiddleware(
            instance(mockedUserRepository),
            instance(mockedEncryptor)
        );
       

        //When: Request has no header x-access-token
        let request: Partial<Request> = {};
        let response: Partial<Response> = {
            json: jest.fn()
        };
        response['status'] = jest.fn().mockReturnValue(response);

        let nextFunction: NextFunction = jest.fn();

        //Then: Unuthorized
        await underTest.verifyToken(request as Request, response as Response, nextFunction);
        expect(response.status).toBeCalledWith(401);
        expect(response.json).toBeCalledWith({ message: 'Unauthorized' });
    });

    test('Empty access token', async () => {
        //Given
        let mockedUserRepository: UserRepository = mock(UserRepository);
        let mockedEncryptor: TokenManagement = mock(TokenManagement);
        const underTest: JwtMiddleware = new JwtMiddleware(
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
        response['status'] = jest.fn().mockReturnValue(response);

        let nextFunction: NextFunction = jest.fn();

        //Then: No token
        await underTest.verifyToken(request as Request, response as Response, nextFunction);
        expect(response.status).toBeCalledWith(401);
        expect(response.json).toBeCalledWith({ message: 'No token' });
    });

    test('User does not exist', async () => {
        //Given
        let mockedEncryptor: TokenManagement = mock(TokenManagement);
        when(mockedEncryptor.verifyToken(anyString())).thenReturn('valid_token');

        let mockedUserRepository: UserRepository = mock(UserRepository);
        when(mockedUserRepository.getUserById(anyString())).thenResolve(null);

        const underTest: JwtMiddleware = new JwtMiddleware(
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
        response['status'] = jest.fn().mockReturnValue(response);

        let nextFunction: NextFunction = jest.fn();

        //Then: No token
        await underTest.verifyToken(request as Request, response as Response, nextFunction as NextFunction);
        expect(response.status).toBeCalledWith(401);
        expect(response.json).toBeCalledWith({ message: 'User does not exist' });

    });

    test('Athorized', async () => {
        //Given
        let mockedUserRepository: UserRepository = mock(UserRepository);
        when(mockedUserRepository.getUserById(anyString())).thenResolve({} as any);

        let mockedEncryptor: TokenManagement = mock(TokenManagement);
        when(mockedEncryptor.verifyToken(anyString())).thenReturn('valid id');

        const underTest: JwtMiddleware = new JwtMiddleware(
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
        response['status'] = jest.fn().mockReturnValue(response);

        let nextFunction: NextFunction = jest.fn();
        //Then: User does not exist
        await underTest.verifyToken(request as IRequestWithUserId, response as Response, nextFunction);
        expect(nextFunction).toBeCalledTimes(1);
    });
});