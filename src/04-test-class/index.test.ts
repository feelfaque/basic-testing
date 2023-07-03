import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const myAccount = getBankAccount(1000);
    const balance = myAccount.getBalance();
    expect(balance).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const myAccount = getBankAccount(1000);
    const balance = myAccount.getBalance();
    expect(() => {
      myAccount.withdraw(1001);
    }).toThrow(new InsufficientFundsError(balance));
  });

  test('should throw error when transferring more than balance', () => {
    const myAccount = getBankAccount(1000);
    const newAccount = getBankAccount(0);
    const balance = myAccount.getBalance();
    expect(() => {
      myAccount.transfer(1001, newAccount);
    }).toThrow(new InsufficientFundsError(balance));
  });

  test('should throw error when transferring to the same account', () => {
    const myAccount = getBankAccount(1000);
    expect(() => {
      myAccount.transfer(20, myAccount);
    }).toThrow(new TransferFailedError());
  });

  test('should deposit money', () => {
    const myAccount = getBankAccount(1000);
    const oldBalance = myAccount.getBalance();
    const depositSumm = 20;
    myAccount.deposit(depositSumm);
    expect(myAccount.getBalance()).toBe(oldBalance + depositSumm);
  });

  test('should withdraw money', () => {
    const myAccount = getBankAccount(1000);
    const oldBalance = myAccount.getBalance();
    const withdrawSumm = 20;
    myAccount.withdraw(withdrawSumm);
    expect(myAccount.getBalance()).toBe(oldBalance - withdrawSumm);
  });

  test('should transfer money', () => {
    const myAccount = getBankAccount(1000);
    const newAccount = getBankAccount(0);
    const myAccountBalance = myAccount.getBalance();
    const newAccountBalance = newAccount.getBalance();
    const transferSumm = 20;
    myAccount.transfer(20, newAccount);

    expect(myAccount.getBalance()).toBe(myAccountBalance - transferSumm);
    expect(newAccount.getBalance()).toBe(newAccountBalance + transferSumm);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn().mockImplementationOnce(() => 1);
    const myAccount = getBankAccount(1000);
    await expect(myAccount.fetchBalance()).resolves.toEqual(expect.any(Number));
    jest.unmock('lodash');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodash.random = jest.fn().mockImplementationOnce(() => 1);
    const myAccount = getBankAccount(1000);
    await myAccount.synchronizeBalance();
    expect(myAccount.getBalance()).toBe(1);
    jest.unmock('lodash');
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);
    const fetchBalanceMock = jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockImplementation(async () => {
        return null;
      });

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );

    fetchBalanceMock.mockClear();
  });
});
