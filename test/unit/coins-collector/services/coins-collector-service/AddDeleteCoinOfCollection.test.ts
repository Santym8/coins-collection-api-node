import { mock, instance, when, anything, anyString } from 'ts-mockito'
import { Response } from 'express';
import { IRequestWithUserId } from '../../../../../src/modules/user/utils/IRequestWithUserId';
import { fakeCoinsDB, fakeCoinsResponse, fakeUserCoinsDB } from '../FakeDB';
//Dependency Injection
import { CoinsCollectorService } from '../../../../../src/modules/coins-collector/service/CoinsCollectorService';
import { CoinRepository } from '../../../../../src/modules/coin/repository/CoinRepository';
import { ProgramRepository } from '../../../../../src/modules/program/repository/ProgramRepository';
import { UserRepository } from '../../../../../src/modules/user/repository/UserRepository';



describe('CoinsCollectorService-GetCoinsOfCollector', () => {

    test('The User does not exist', async () => {

        let mockedCoinRepository: CoinRepository = mock(CoinRepository);
        let fakeCoins: any = {};
        when(mockedCoinRepository.getAllCoins()).thenResolve(fakeCoins);

        let mocekdProgramRepository: ProgramRepository = mock(ProgramRepository);
        let mockUserRepository: UserRepository = mock(UserRepository);
        let fakeUser: any = null;

        when(mockUserRepository.getUserById(anyString())).thenResolve(fakeUser);

        let coinService: CoinsCollectorService = new CoinsCollectorService(
            instance(mockedCoinRepository),
            instance(mockUserRepository)
        );

        let request: Partial<IRequestWithUserId> = {
            query: {
                idCollection: 'idCollection'
            },
            userId: 'userId'
        };
        let response: Partial<Response> = {
            json: jest.fn()
        };
        response['status'] = jest.fn().mockReturnValue(response);

        await coinService.getAllCoinsWithFounded(request as IRequestWithUserId, response as Response);
        expect(response.status).toBeCalledWith(400);
        expect(response.json).toBeCalledWith({ message: 'The User does not exist' });
    });


    test('No Coins', async () => {

        let mockedCoinRepository: CoinRepository = mock(CoinRepository);
        let fakeCoins: any = [];
        when(mockedCoinRepository.getAllCoins()).thenResolve(fakeCoins);

        let mocekdProgramRepository: ProgramRepository = mock(ProgramRepository);
        let mockUserRepository: UserRepository = mock(UserRepository);
        let fakeUser: any = {};

        when(mockUserRepository.getUserById(anyString())).thenResolve(fakeUser);

        let coinService: CoinsCollectorService = new CoinsCollectorService(
            instance(mockedCoinRepository),
            instance(mockUserRepository)
        );

        let request: Partial<IRequestWithUserId> = {
            query: {
                idCollection: 'idCollection'
            },
            userId: 'userId'
        };
        let response: Partial<Response> = {
            json: jest.fn()
        };
        response['status'] = jest.fn().mockReturnValue(response);

        await coinService.getAllCoinsWithFounded(request as IRequestWithUserId, response as Response);
        expect(response.status).toBeCalledWith(400);
        expect(response.json).toBeCalledWith({ message: 'No coins' });

    });


    test('GetCoinsOfCollector OK', async () => {

        let mockedCoinRepository: CoinRepository = mock(CoinRepository);
        let fakeCoins: any = fakeCoinsDB;
        when(mockedCoinRepository.getAllCoins()).thenResolve(fakeCoins);

        let mocekdProgramRepository: ProgramRepository = mock(ProgramRepository);

        let mockUserRepository: UserRepository = mock(UserRepository);
        let fakeUser: any = {
            coins: fakeUserCoinsDB
        };

        when(mockUserRepository.getUserById(anyString())).thenResolve(fakeUser);

        let coinService: CoinsCollectorService = new CoinsCollectorService(
            instance(mockedCoinRepository),
            instance(mockUserRepository)
        );

        let request: Partial<IRequestWithUserId> = {
            query: {
                idCollection: '621ea811cee5982b1c89109e'
            },
            userId: 'userId'
        };
        let response: Partial<Response> = {
            json: jest.fn()
        };
        response['status'] = jest.fn().mockReturnValue(response);

        await coinService.getAllCoinsWithFounded(request as IRequestWithUserId, response as Response);
        expect(response.status).toBeCalledWith(200);
        expect(response.json).toBeCalledWith(fakeCoinsResponse);
    });


});