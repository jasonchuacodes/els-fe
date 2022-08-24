import React, { useState } from 'react'

type UserContextType = {
  loginStatus: boolean,
  setLoginStatus: (value: boolean) => void,
  loading: boolean,
  setLoading: (value: boolean) => void,
}

// step1 create the context
export const UserContext = React.createContext<UserContextType | null>(null);

// step 2 create the provider and set the values to be passed to the components
export const UserProvider = ({children}: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ loginStatus, setLoginStatus, loading, setLoading }}>  
      {children}
    </UserContext.Provider>
  )
}
// step 3 -> expose the context by wrapping the parent component with the provider
// step 4 -> you may now use the context with `useContext` inside the components after importing  
