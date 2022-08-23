import React, { useState } from 'react'

interface IUser {
}

interface IUserDispatchContext {
}

interface IChildren {
  children: React.ReactNode;
}

export const UserContext = React.createContext<IUser | null>(null);
export const UserDispatchContext = React.createContext<IUserDispatchContext | null>(null);

const UserProvider = ({ children }: IChildren) => {
  const [loginStatus, setLoginStatus] = useState(false);

  const updateLoginStatus = () => {
    setLoginStatus(true);
  };
  return (
    <UserContext.Provider value={loginStatus}>
      <UserDispatchContext.Provider value={updateLoginStatus}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;