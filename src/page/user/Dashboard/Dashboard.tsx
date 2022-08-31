import Cookies from 'js-cookie';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../../../components/DashboardCard/DashboardCard';
import { UserContext, UserContextType } from '../../../context/UserContext';

const Dashboard = () => {
  const { users, fetchUsers } = useContext(UserContext) as UserContextType;
  const userData = (Cookies.get('user') && JSON.parse(Cookies.get('user') || '{}'));

  const image = require('../../../assets/images/man.jpg');

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <>
      <div className="profile flex w-full">
        <div className="w-1/3">
          <h1 className="font-bold mb-3">DASHBOARD</h1>
          <DashboardCard user={userData} image={image} />
        </div>
        <div className="w-2/3 border ml-5 p-5">
          <div className="font-bold italic mb-5">People</div>
          <div className="border w-full my-2"></div>

          {users?.map((user: any) => {
            return (
              <div key={user.id}>
                <Link to={`/profile/${user.id}`}>
                  {user.first_name} {user.last_name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
