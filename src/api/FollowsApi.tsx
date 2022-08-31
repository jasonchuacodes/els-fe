import instance from "./instance";

const FollowsApi = {
  follow: (id: number | undefined, token: string | undefined) => {
    const config = {
      method: 'POST',
      url: `/${id}/follow`,
      headers: { Authorization: `Bearer ${token}` },
    };
    return instance.request(config);
  },
  unfollow: (id: number | undefined, token: string | undefined) => {
    const config = {
      method: 'POST',
      url: `/${id}/unfollow`,
      headers: { Authorization: `Bearer ${token}` },
    };
    return instance.request(config);
  },
  fetchFollowers: (id?: number, token?: string ) => {
    const config = {
      method: 'GET',
      url: `/${id}/followers`,
      headers: { Authorization: `Bearer ${token}` }
    }
    return instance.request(config);
  },
  fetchFollowings: (id?: number, token?: string) => {
    const config = {
      method: 'GET',
      url: `/${id}/followings`,
      headers: {
        Authorization: `Bearer ${ token }`
      }
    }
    return instance.request(config);
  }
};

export default FollowsApi;
