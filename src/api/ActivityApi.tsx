import instance from "./instance";

const ActivityApi = {
  fetchUserActivities: (user_id: number, token?: string) => {
    const config = {
      method: "GET",
      url: "/activities",
      params: {
        user_id
      },
      headers: { Authorization: `Bearer ${token}` },
    }
    return instance.request(config);
  },
  fetchAllUsersActivities: (token?: string) => {
    const config = {
      method: "GET",
      url: "/all-activities",
      headers: { Authorization: `Bearer ${token}` },
    }
    return instance.request(config);
  }
}

export default ActivityApi;