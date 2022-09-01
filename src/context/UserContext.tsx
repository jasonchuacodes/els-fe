import Cookies from 'js-cookie';
import React, { createContext, useEffect } from 'react';
import { NumericLiteral } from 'typescript';
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
  isFollowing: (id: number, token: string) => void;
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
  const [authUser, setAuthUser] = React.useState<UserDataType>({});
  const [user, setUser] = React.useState<UserDataType>({});
  const [users, setUsers] = React.useState<UsersDataType>([]);

  const fetchUser = (id?: number, token?: string) =>
    UserApi.fetchUser(id, token).then((res) => {
      Cookies.set('user', JSON.stringify(res.data));
      setUser(res.data);
    });

  const fetchUsers = () =>
    UserApi.fetchUsers().then((res) => {
      setUsers(res.data);
    });

  const isFollowing = (id: number, token:string) => {
    FollowsApi.isFollowing(id, token)
  }

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
        users,
        fetchUser,
        fetchUsers,
        follow, 
        unfollow,
        isFollowing,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
