import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = () => {
      
      setUser({ name: 'Snow White', email: 'SnowWhite@apple.com' });
  };

  const logout = () => {

      setUser(null);
  };

  return (
      <UserContext.Provider value={{ user, login, logout }}>
          {children}
      </UserContext.Provider>
  );
};
