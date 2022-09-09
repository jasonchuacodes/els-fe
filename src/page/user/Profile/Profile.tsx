import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import ProfileCard from '../../../components/ProfileCard/ProfileCard';
import { useParams } from 'react-router-dom';
import FollowsApi from '../../../api/FollowsApi';
import { UserContext, UserContextType } from '../../../context/UserContext';

const activities = [
  {
    id: 1,
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, corrupti! Nemo itaque odit rerum ipsa sapiente veritatis, minima consequuntur',
  },
  {
    id: 2,
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, corrupti! Nemo itaque odit rerum ipsa sapiente veritatis, minima consequuntur',
  },
  {
    id: 3,
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, corrupti! Nemo itaque odit rerum ipsa sapiente veritatis, minima consequuntur',
  },
];

const Profile = () => {
  const { id } = useParams();
  const userId = Number(id);
  const image = require('../../../assets/images/man.jpg');
  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  
  const authUser = (Cookies.get('auth_user') && JSON.parse(Cookies.get('auth_user') || '{}'));
  const token = Cookies.get('access_token');
  
  const { fetchUser, user } = React.useContext(UserContext) as UserContextType;

  useEffect(() => {
    fetchUser(userId, token);

    FollowsApi.fetchFollowers(userId, token).then((res) => {
      setFollowers(res.data.followers);
    });

    FollowsApi.fetchFollowings(userId, token).then((res) => {
      setFollowings(res.data.followings);
    });
    
    if (userId !== authUser.id) {
      FollowsApi.isFollowing(userId, token).then((res) => {
        setIsFollowing(res.data)
      })
    }
  }, [id, isFollowing]);

  return (
    <>
      <div className="profile flex w-full">
        <div className="w-1/3">
          <ProfileCard
            id={id}
            user={user}
            authUser={authUser}
            image={image}
            followers={followers}
            followings={followings}
            isFollowing={isFollowing}
            setIsFollowing={setIsFollowing}
          />
        </div>
        <div className="w-2/3 border ml-5 p-5">
          <div className="font-bold italic mb-5">Activities</div>
          <hr />
          <div className="flex flex-col justify-around">
            {activities.map((activity) => {
              return (
                <div key={activity.id}>
                  <div className="flex p-5">
                    <img
                      className="mr-4 h-20 w-20 rounded-full"
                      src={image}
                      alt="profile"
                    />
                    <div className="info">
                      <div className="text-sm">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Sint, corrupti! Nemo itaque odit rerum ipsa
                        sapiente veritatis, minima consequuntur{' '}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
