import instance from './instance';

interface ILoginParams {
  email?: string;
  password?: string;
}
interface IRegisterParams {
  first_name?: string,
  last_name?: string,
  email?: string,
  password?: string,
  password_confirmation?: string
}

const AuthApi = {
  register: (params: IRegisterParams) => {
    const config = {
      method: 'POST',
      url: '/register',
      params: {
        ...params
      }
    }
    return instance.request(config);
  },

  login: (params: ILoginParams) => {
    const config = {
      url: '/login',
      method: 'POST',
      params: {
        ...params,
      },
    };
    return instance.request(config);
  },
  logout: (token:string | undefined) => {
    const config = {
      url: '/logout',
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    };
    return instance.request(config);
  },
};

export default AuthApi;


