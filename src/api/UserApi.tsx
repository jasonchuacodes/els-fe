import instance from './instance'

const UserApi = {
  fetchUser: (id:number | undefined, token:string | undefined) => {
    const config = {
      method: 'GET',
      url: `/users/${id}`,
      headers: {Authorization: `Bearer ${token}`}
    }
    return instance.request(config);
  },
  fetchUsers: () => {
    const config = {
      method: 'GET',
      url: `/users`,
      // headers: {Authorization: `Bearer ${token}`}
    }
    return instance.request(config);
  }
}
export default UserApi
