import instance from "./instance";

interface IParams {
  email?: string,
  password?: string
}

const LoginApi = {
  login: (params: IParams) => {
    const config = {
      url: '/login',
      method: 'POST',
      params: {
        ...params
      }
    }
    return instance.request(config);
  },
}

export default LoginApi;
