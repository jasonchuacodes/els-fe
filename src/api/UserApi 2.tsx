import instance from './instance'

interface IUser {
  id: number,
  token: any
}

const UserApi = {
  getUser: (id:number, token:string | undefined) => {
    const config = {
      method: 'GET',
      url: `/profile/${id}`,
      headers: {Authorization: `Bearer ${token}`}
    }
    return instance.request(config);
  }
}
export default UserApi