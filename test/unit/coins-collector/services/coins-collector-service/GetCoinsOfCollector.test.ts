import { mock, instance, when, anything, anyString } from 'ts-mockito'
import { Response } from 'express';
import { IRequestWithUserId } from '../../../../../src/modules/user/utils/IRequestWithUserId';

//Dependency Injection
import { CoinsCollectorService } from '../../../../../src/modules/coins-collector/service/CoinsCollectorService';
import { CoinRepository } from '../../../../../src/modules/coin/repository/CoinRepository';
import { ProgramRepository } from '../../../../../src/modules/program/repository/ProgramRepository';
import { UserRepository } from '../../../../../src/modules/user/repository/UserRepository';



describe('CoinsCollectorService-AddDeleteCoinOfCollection', () => {

    test('The User does not exist', async () => {

        let mockedCoinRepository: CoinRepository = mock(CoinRepository);

        let mocekdProgramRepository: ProgramRepository = mock(ProgramRepository);

        let mockUserRepository: UserRepository = mock(UserRepository);
        let fakeUser: any = null;
        when(mockUserRepository.getUserById(anyString())).thenResolve(fakeUser);

        let coinService: CoinsCollectorService = new CoinsCollectorService(
            instance(mockedCoinRepository),
            instance(mockUserRepository)
        );

        let request: Partial<IRequestWithUserId> = {
            body: {
                idCoin: 'idCoin'
            },
            userId: 'userId'
        };
        let response: Partial<Response> = {
            json: jest.fn()
        };
        response['status'] = jest.fn().mockReturnValue(response);

        await coinService.addOrDeleteCoinOfCollector(request as IRequestWithUserId, response as Response);
        expect(response.status).toBeCalledWith(400);
        expect(response.json).toBeCalledWith({ message: 'The User does not exist' });
    });

    test('The Coin does not exist', async () => {

        let mockedCoinRepository: CoinRepository = mock(CoinRepository);
        when(mockedCoinRepository.getCoinById(anyString())).thenResolve(null);

        let mocekdProgramRepository: ProgramRepository = mock(ProgramRepository);

        let mockUserRepository: UserRepository = mock(UserRepository);
        let fakeUser: any = {};
        when(mockUserRepository.getUserById(anyString())).thenResolve(fakeUser);

        let coinService: CoinsCollectorService = new CoinsCollectorService(
            instance(mockedCoinRepository),
            instance(mockUserRepository)
        );

        let request: Partial<IRequestWithUserId> = {
            body: {
                idCoin: 'idCoin'
            },
            userId: 'userId'
        };
        let response: Partial<Response> = {
            json: jest.fn()
        };
        response['status'] = jest.fn().mockReturnValue(response);

        await coinService.addOrDeleteCoinOfCollector(request as IRequestWithUserId, response as Response);
        expect(response.status).toBeCalledWith(400);
        expect(response.json).toBeCalledWith({ message: 'The Coin does not exist' });
    });

    test('Coin added OK', async () => {

        let mockedCoinRepository: CoinRepository = mock(CoinRepository);
        let fakeCoin: any = {};
        when(mockedCoinRepository.getCoinById(anyString())).thenResolve(fakeCoin);

        let mocekdProgramRepository: ProgramRepository = mock(ProgramRepository);

        let mockUserRepository: UserRepository = mock(UserRepository);
        let fakeUser: any = { coins: ['621fcd41e23536204e045742', '621fcd41e23536204e045740'] };
        when(mockUserRepository.getUserById(anyString())).thenResolve(fakeUser);

        let coinService: CoinsCollectorService = new CoinsCollectorService(
            instance(mockedCoinRepository),
            instance(mockUserRepository)
        );

        let request: Partial<IRequestWithUserId> = {
            body: {
                idCoin: 'idCoin'
            },
            userId: 'userId'
        };
        let response: Partial<Response> = {
            json: jest.fn()
        };
        response['status'] = jest.fn().mockReturnValue(response);

        await coinService.addOrDeleteCoinOfCollector(request as IRequestWithUserId, response as Response);
        expect(response.status).toBeCalledWith(200);
        expect(response.json).toBeCalledWith({ message: 'Added' });
    });

    test('Coin removed OK', async () => {

        let mockedCoinRepository: CoinRepository = mock(CoinRepository);
        let fakeCoin: any = {};
        when(mockedCoinRepository.getCoinById(anyString())).thenResolve(fakeCoin);

        let mocekdProgramRepository: ProgramRepository = mock(ProgramRepository);

        let mockUserRepository: UserRepository = mock(UserRepository);
        let fakeUser: any = { coins: ['621fcd41e23536204e045742', '621fcd41e23536204e045740'] };
        when(mockUserRepository.getUserById(anyString())).thenResolve(fakeUser);

        let coinService: CoinsCollectorService = new CoinsCollectorService(
            instance(mockedCoinRepository),
            instance(mockUserRepository)
        );

        let request: Partial<IRequestWithUserId> = {
            body: {
                idCoin: '621fcd41e23536204e045742'
            },
            userId: 'userId'
        };
        let response: Partial<Response> = {
            json: jest.fn()
        };
        response['status'] = jest.fn().mockReturnValue(response);

        await coinService.addOrDeleteCoinOfCollector(request as IRequestWithUserId, response as Response);
        expect(response.status).toBeCalledWith(200);
        expect(response.json).toBeCalledWith({ message: 'Removed' });
    });

});