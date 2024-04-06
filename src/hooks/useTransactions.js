import { useContext, useCallback } from 'react';
import { UserContext } from '../contexts/UserContext';

const useTransactions = () => {
  const { users, setUsers, userLoggedInIndex } = useContext(UserContext);

  const deposit = useCallback((amount) => {
    if (userLoggedInIndex === null || amount <= 0) return false;

    const newUsers = [...users];
    newUsers[userLoggedInIndex] = {
      ...newUsers[userLoggedInIndex],
      balance: newUsers[userLoggedInIndex].balance + amount,
      transactions: [...newUsers[userLoggedInIndex].transactions, { type: 'Deposit', date: new Date().toISOString().split('T')[0], value: amount }]
    };

    setUsers(newUsers);
    return true;
  }, [users, setUsers, userLoggedInIndex]);

  const withdraw = useCallback((amount) => {
    if (userLoggedInIndex === null || amount <= 0) return false;
    if (users[userLoggedInIndex].balance < amount) return false;

    const newUsers = [...users];
    newUsers[userLoggedInIndex] = {
      ...newUsers[userLoggedInIndex],
      balance: newUsers[userLoggedInIndex].balance - amount,
      transactions: [...newUsers[userLoggedInIndex].transactions, { type: 'Withdraw', date: new Date().toISOString().split('T')[0], value: amount }]
    };

    setUsers(newUsers);
    return true;
  }, [users, setUsers, userLoggedInIndex]);

  return { deposit, withdraw };
};

export default useTransactions;
