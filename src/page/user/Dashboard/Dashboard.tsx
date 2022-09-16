import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ActivityApi from '../../../api/ActivityApi';
import DashboardCard from '../../../components/DashboardCard/DashboardCard';
import { UserContext, UserContextType } from '../../../context/UserContext';
import timeSince from '../../../utilities/timeSince';
import { IActivity } from '../../../api/ActivityApi';

const Dashboard = () => {
  const token = Cookies.get('access_token');
  const userData = (Cookies.get('user') && JSON.parse(Cookies.get('user') || '{}'));
  const { fetchUser, fetchUsers, user, users } = React.useContext(UserContext) as UserContextType;

  const [allActivities, setAllActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    fetchUsers()
    fetchUser(userData.id, token);

    ActivityApi.fetchAllUsersActivities(token).then(res => {
      setAllActivities(res.data)
    })
  }, [])

  return (
    <>
      <div className="profile flex w-full">
        <div className="w-1/3">
          <h1 className="font-bold mb-3">DASHBOARD</h1>
          <DashboardCard user={userData} image={user.avatar} />
        </div>
        <div className="w-2/3 border ml-5 p-5">
          <div className="font-bold italic mb-5">People</div>
          <div className="border w-full my-2"></div>

          {allActivities?.map((activity: IActivity) => {
            return (
              <div key={activity.id}>
                  <div className="flex items-center p-5">
                    <Link className='cursor-pointer' to={`/profile/${activity.activitiable_id}`}>
                    <img
                      className="mr-4 h-20 w-20 rounded"
                      src={users[activity.activitiable_id-1]?.avatar}
                      alt="profile"
                    />
                    </Link>
                    <div className="info">
                      <div className="text-lg">{activity.activity}</div>
                      <div className="text-xs italic">
                      {timeSince(Number(new Date(activity?.created_at))) + ' ago'}
                      </div>
                    </div>
                  </div>
                </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
