import Cookies from 'js-cookie';
import React, { createContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthApi from '../api/AuthApi';
import FollowsApi from '../api/FollowsApi';
import UserApi from '../api/UserApi';

export interface UserContextType {
  authUser: UserDataType;
  user: UserDataType;
  users?: UsersDataType;
  userData?: UserDataType;
  token?: string | undefined;
  setToken?: any;
  errors?: { email?: [], password?: []  };
  fetchUser: (id?: number, token?: string) => void;
  fetchUsers: () => void;
  follow: (id?:number, token?:string) => void;
  unfollow: (id?:number, token?:string) => void;
};

export type UserDataType = {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  email_verified_at?: string;
  is_admin?: number | boolean;
  avatar?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type UsersDataType = {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  email_verified_at?: string;
  is_admin?: number | boolean;
  avatar?: string | null;
  created_at?: string;
  updated_at?: string;
}[];

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<string | undefined>('');
  const [authUser, setAuthUser] = React.useState<UserDataType>({});
  const [user, setUser] = React.useState<UserDataType>({});
  const [users, setUsers] = React.useState<UsersDataType>([]);

  useEffect(() => {
    if(Cookies.get('access_token')) {
      setToken(Cookies.get('access_token'))
    }
  }, [])

  const fetchUser = (id?: number, token?: string) =>
    UserApi.fetchUser(id, token).then((res) => {
      Cookies.set('user', JSON.stringify(res.data));
      setUser(res.data);
    });

  const fetchUsers = () =>
    UserApi.fetchUsers().then((res) => {
      setUsers(res.data);
    });


  const follow = (id?: number, token?: string) => {
    FollowsApi.follow(id, token);
  };

  const unfollow = (id?: number, token?: string) => {
    FollowsApi.unfollow(id, token);
  };

  return (
    <UserContext.Provider
      value={{
        authUser,
        user,
        token,
        setToken,
        users,
        fetchUser,
        fetchUsers,
        follow, 
        unfollow,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
