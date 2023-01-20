import React from 'react';

import { Context, createContext, useContext, useState } from 'react';
import { User, UserState } from '../types/types';

export const useUserContext = () => useContext(UserContext);
export const UserContext: Context<UserState> = createContext<UserState>({
  user: {} as User,
  rememberMe: false,
  setRememberMe: () => {},
  setUser: () => {},
});

export function UserContextProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    password: '',
    mail: '',
  });
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  return (
    <UserContext.Provider value={{ user, rememberMe, setUser, setRememberMe }}>
      {children}
    </UserContext.Provider>
  );
}
