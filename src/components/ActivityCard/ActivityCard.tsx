import React from 'react'
import { Link } from 'react-router-dom';
import { UserDataType } from '../../context/UserContext';

interface IActivityCard {
  user: UserDataType
}

const ActivityCard = ({ user }: IActivityCard) => {
  return (
    <div className='flex mb-2'>
      <div className='mr-2'>
        <img className='italic text-xs rounded h-12 w-12 bg-red-200' src={user?.avatar} alt="avatar" />
      </div>
      <div className='w-full'>
        <div className="italic bg-gray-200">
          <Link to={`/profile/${user.id}`}>
            {user.first_name} {user.last_name}
          </Link>
        </div>
        <div>
          <div className='ml-3'>
            Followed new user!
          </div>
          <div className='italic text-xs text-gray-400 ml-3'>
            2 days ago
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard