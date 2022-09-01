import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

import { UserContext, UserContextType, UserDataType} from '../../context/UserContext';
interface IProfileCard {
  authUser: UserDataType;
  user: UserDataType;
  id?: string;
  image?: string;
  followers: number;
  followings: number;
  isFollowing?: boolean
  setIsFollowing: (value: boolean) => void;
}

const ProfileCard = ({ authUser, user,  image, followers, followings , isFollowing, setIsFollowing }: IProfileCard) => {

  const { follow, unfollow } = React.useContext(UserContext) as UserContextType;
  const token = Cookies.get('access_token');

  const handleFollow = () => {
    if (!isFollowing) {
      follow(user.id, token)
      setIsFollowing(true)
    } else {
      unfollow(user.id, token)
      setIsFollowing(false)
    }
  };

  return (
    <div>
      <div className="profile__card flex flex-col items-center bg-gray-100 py-20">
        <img
          className="w-40 h-40 rounded-full mb-5"
          src={image}
          alt="man.jpg"
        />
        <div className="mb-5">
          {
            authUser?.id === user?.id ? <span>AUTH {authUser.first_name}</span> : <>USER: {user?.first_name} {user?.last_name}</>
          }
        </div>
        <hr className="border-black w-2/3" />
        <div className="follows flex flex-col mb-3">
          <div className="flex mb-3">
            <div className="flex items-center px-5 py-2 flex-col">
              <div>{followers}</div>
              <div>followers</div>
            </div>
            <div className="flex items-center px-5 py-2 flex-col">
              <div>{followings}</div>
              <div>following</div>
            </div>
          </div>

          {authUser?.id === user?.id ? (
            <></>
          ) : (
            <button onClick={handleFollow}
              className="rounded-md border-2 bg-gray-600 text-white px-4 py-2"
            >
              {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
            </button>
          )}
        </div>
        <div>Learned 20 words</div>
      </div>
    </div>
  );
};

export default ProfileCard;
