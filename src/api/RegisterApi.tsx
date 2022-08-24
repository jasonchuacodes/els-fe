import instance from "./instance";

interface IParams {
  first_name?: string,
  last_name?: string,
  email?: string,
  password?: string,
  password_confirmation?: string
}

const RegisterApi = {
  registerUser: (params: IParams) => {
    const config = {
      method: 'POST',
      url: '/register',
      params: {
        ...params
      }
    }
    return instance.request(config);
  }
}

export default RegisterApi;
