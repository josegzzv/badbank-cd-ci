import { useState, useCallback } from 'react';

function useAuth(users, setUsers) {
  const [currentUser, setCurrentUser] = useState(null);

  const findUserByEmailAndPasswd = useCallback((email, password) => {
    const userIndex = users.findIndex(
      (user) => user.email === email && user.password === password
    );

    if (userIndex !== -1) {
      setCurrentUser(users[userIndex]);
    }

    return userIndex;
  }, [users]);

  const createUser = useCallback((users, setUsers, newUser) => {
    const userExists = users.some(user => user.email === newUser.email);
    
    if (userExists) {
      return { success: false, message: 'Usuario ya existe.' };
    }

    setUsers([...users, newUser]);
    return { success: true, message: 'Usuario creado con éxito.' };
  }, [users, setUsers]);

  // Otras funciones de autenticación pueden ir aquí

  return { currentUser, findUserByEmailAndPasswd, createUser };
}

export default useAuth;
