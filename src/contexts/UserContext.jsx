// src/contexts/UserContext.js

import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const usersIniciales = [
    {
      name: "John Doe",
      email: "john@mit.edu",
      password: "password123",
      balance: 1000,
      transactions: [
        {
          type: "Deposit",
          date: "2023-01-01",
          value: 1200
        },
        {
          type: "Withdraw",
          date: "2023-01-15",
          value: 200
        }
      ]
    },
    {
      name: "Jane Smith",
      email: "jane@mit.edu",
      password: "password456",
      balance: 1500,
      transactions: [
        {
          type: "Deposit",
          date: "2023-01-02",
          value: 1650
        },
        {
          type: "Withdraw",
          date: "2023-01-18",
          value: 150
        }
      ]
    }
  ];

  const [users, setUsers] = useState(usersIniciales);
  const [userLoggedInIndex, setUserLoggedInIndex] = useState(null);

  // Función para iniciar sesión
  const logIn = (email, password) => {
    const foundIndex = users.findIndex(
      (user) => user.email === email && user.password === password
    );
    if (foundIndex !== -1) {
      setUserLoggedInIndex(foundIndex);
    }
    return foundIndex;
  };

  // Función para cerrar sesión
  const logOut = () => {
    setUserLoggedInIndex(null);
  };

  return (
    <UserContext.Provider value={{ users, setUsers, userLoggedInIndex, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
