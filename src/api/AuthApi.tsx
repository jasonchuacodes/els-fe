import instance from './instance';

interface IParams {
  email?: string;
  password?: string;
}

const AuthApi = {
  login: (params: IParams) => {
    const config = {
      url: '/login',
      method: 'POST',
      params: {
        ...params,
      },
    };
    return instance.request(config);
  },
  logout: (token:any) => {
    const config = {
      url: '/logout',
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    };
    return instance.request(config);
  },
};

export default AuthApi;
