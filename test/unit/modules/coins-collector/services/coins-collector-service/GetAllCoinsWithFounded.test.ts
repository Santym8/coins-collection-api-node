import { mock, instance, when, anything, anyString } from 'ts-mockito'
import { Response } from 'express';
import { IRequestWithUserId } from '../../../../../../src/config/jwt/IRequestWithUserId';
import { fakeCoinsDB, expectedCoinsResponse, fakeUserCoinsDB } from '../FakeDB';
//Dependency Injection
import { CoinsCollectorService } from '../../../../../../src/modules/coins-collector/service/CoinsCollectorService';
import { CoinRepository } from '../../../../../../src/modules/coin/repository/CoinRepository';
import { ProgramRepository } from '../../../../../../src/modules/program/repository/ProgramRepository';
import { UserRepository } from '../../../../../../src/modules/user/repository/UserRepository';
import { UserException } from '../../../../../../src/modules/user/exception/UserException';
import { Types } from 'mongoose';
import { CoinException } from '../../../../../../src/modules/coin/exception/CoinException';



describe('CoinsCollectorService-GetCoinsOfCollector', () => {

    test('The User does not exist', async () => {
        // Given
        const mockedCoinRepository: CoinRepository = mock(CoinRepository);
        const mockedUserRepository: UserRepository = mock(UserRepository);
        when(mockedUserRepository.getUserById(anyString())).thenResolve(null);
        const underTest = new CoinsCollectorService(
            instance(mockedCoinRepository),
            instance(mockedUserRepository)
        );

        const idCollector = 'idCollectorThatDoesNotExist';
        const idCollection = 'idCollection';
        // When

        const result = () => underTest.getAllCoinsWithFounded(idCollector, idCollection);

        // Then
        expect(result).rejects.toThrowError(UserException);
        expect(result).rejects.toThrowError('The User does not exist');
    });


    test('Get all coins of collector', async () => {
        // Given
        const mockedCoinRepository: CoinRepository = mock(CoinRepository);
        const mockedUserRepository: UserRepository = mock(UserRepository);
        when(mockedUserRepository.getUserById(anyString())).thenResolve({ coins: fakeUserCoinsDB } as any);
        when(mockedCoinRepository.getAllCoins(anyString())).thenResolve(fakeCoinsDB);
        const underTest = new CoinsCollectorService(
            instance(mockedCoinRepository),
            instance(mockedUserRepository)
        );

        const idCollector = 'idCollector';
        const idCollection = 'fakeProgramId';
        // When

        const result = await underTest.getAllCoinsWithFounded(idCollector, idCollection);

        // Then
        expect(result).toEqual(expectedCoinsResponse);
    });




});