import Cookies from 'js-cookie';
import React, { useContext, useEffect } from 'react';
import DashboardCard from '../../../components/DashboardCard/DashboardCard';
import ActivityCard from '../../../components/ActivityCard/ActivityCard';
import { UserContext, UserContextType } from '../../../context/UserContext';

const Dashboard = () => {
  const userData =
    Cookies.get('user') && JSON.parse(Cookies.get('user') || '{}');
  const image = require('../../../assets/images/man.jpg');
  const { users, fetchUsers } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="profile flex w-full">
        <div className="w-1/3">
          <h1 className="font-bold mb-3">DASHBOARD</h1>
          <DashboardCard user={userData} image={image} />
        </div>
        <div className="w-2/3 border ml-5 p-5">
          <div className="font-bold italic mb-5">Activities</div>
          <div className="border w-full my-2"></div>

          {users?.map((user: any) => {
            return (
              <div key={user.id}>
                <ActivityCard user={user} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
