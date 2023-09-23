import { mock, instance, when, anything, anyString } from 'ts-mockito'
import { Response } from 'express';
import { IRequestWithUserId } from '../../../../../../src/config/jwt/IRequestWithUserId';

//Dependency Injection
import { CoinsCollectorService } from '../../../../../../src/modules/coins-collector/service/CoinsCollectorService';
import { CoinRepository } from '../../../../../../src/modules/coin/repository/CoinRepository';
import { ProgramRepository } from '../../../../../../src/modules/program/repository/ProgramRepository';
import { UserRepository } from '../../../../../../src/modules/user/repository/UserRepository';
import { UserException } from '../../../../../../src/modules/user/exception/UserException';
import { CoinException } from '../../../../../../src/modules/coin/exception/CoinException';



describe('CoinsCollectorService-AddDeleteCoinOfCollection', () => {

    test('The User does not exist', async () => {
        // Given
        const mockedCoinRepository = mock(CoinRepository);

        const mockedUserRepository = mock(UserRepository);
        when(mockedUserRepository.getUserById(anyString())).thenResolve(null);

        const underTest = new CoinsCollectorService(
            instance(mockedCoinRepository),
            instance(mockedUserRepository)
        );

        const idCollector = 'idCollector';
        const idCoin = 'idCoin';

        // When
        const result = () => underTest.addOrDeleteCoinOfCollector(idCollector, idCoin);

        // Then
        expect(result).rejects.toThrowError(UserException);
        expect(result).rejects.toHaveProperty('statusCode', 400);
        expect(result).rejects.toHaveProperty('message', 'The User does not exist');

    });

    test('The Coin does not exist', async () => {
        // Given
        const mockedCoinRepository = mock(CoinRepository);
        when(mockedCoinRepository.getCoinById(anyString())).thenResolve(null);

        const mockedUserRepository = mock(UserRepository);
        when(mockedUserRepository.getUserById(anyString())).thenResolve({} as any);

        const underTest = new CoinsCollectorService(
            instance(mockedCoinRepository),
            instance(mockedUserRepository)
        );

        const idCollector = 'idCollector';
        const idCoin = 'idCoin';

        // When
        const result = () => underTest.addOrDeleteCoinOfCollector(idCollector, idCoin);

        // Then
        expect(result).rejects.toThrowError(CoinException);
        expect(result).rejects.toHaveProperty('statusCode', 400);
        expect(result).rejects.toHaveProperty('message', 'The Coin does not exist');

    });

    test('Error saving the user', async () => {
        // Given
        const idCollector = 'idCollector';
        const idCoin = 'id_1';
        const userCoins = ["id_1", "id_2"]

        const mockedCoinRepository = mock(CoinRepository);
        when(mockedCoinRepository.getCoinById(anyString())).thenResolve({ id: idCoin } as any);

        const mockedUserRepository = mock(UserRepository);
        when(mockedUserRepository.getUserById(anyString())).thenResolve({ coins: userCoins } as any);
        when(mockedUserRepository.saveUserUpdated(anything())).thenReject(new Error('Error saving the user'));

        const underTest = new CoinsCollectorService(
            instance(mockedCoinRepository),
            instance(mockedUserRepository)
        );

        // When
        const result = () => underTest.addOrDeleteCoinOfCollector(idCollector, idCoin);

        // Then
        expect(result).rejects.toThrowError(UserException);
        expect(result).rejects.toHaveProperty('statusCode', 500);
        expect(result).rejects.toHaveProperty('message', 'Error saving the user');

    });

    test("Coin removed from the collection", async () => {
        // Given

        const idCollector = 'idCollector';
        const idCoin = 'id_1';
        const userCoins = ["id_1", "id_2"]


        const mockedCoinRepository = mock(CoinRepository);
        when(mockedCoinRepository.getCoinById(anyString())).thenResolve({ id: idCoin } as any);

        const mockedUserRepository = mock(UserRepository);
        when(mockedUserRepository.getUserById(anyString())).thenResolve({ coins: userCoins } as any);
        when(mockedUserRepository.saveUserUpdated(anything())).thenResolve({} as any);

        const underTest = new CoinsCollectorService(
            instance(mockedCoinRepository),
            instance(mockedUserRepository)
        );

        // When
        const result = await underTest.addOrDeleteCoinOfCollector(idCollector, idCoin);

        // Then
        expect(result.message).toBe("Removed");

    });

    test("Coin added to the collection", async () => {
        // Given

        const idCollector = 'idCollector';
        const idCoin = 'id_3';
        const userCoins = ["id_1", "id_2"]


        const mockedCoinRepository = mock(CoinRepository);
        when(mockedCoinRepository.getCoinById(anyString())).thenResolve({ id: idCoin } as any);

        const mockedUserRepository = mock(UserRepository);
        when(mockedUserRepository.getUserById(anyString())).thenResolve({ coins: userCoins } as any);
        when(mockedUserRepository.saveUserUpdated(anything())).thenResolve({} as any);

        const underTest = new CoinsCollectorService(
            instance(mockedCoinRepository),
            instance(mockedUserRepository)
        );

        // When
        const result = await underTest.addOrDeleteCoinOfCollector(idCollector, idCoin);

        // Then
        expect(result.message).toBe("Added");

    });

    
       



});