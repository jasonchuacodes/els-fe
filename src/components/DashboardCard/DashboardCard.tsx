import React from 'react'
import { useContext } from 'react'
import { UserContext, UserContextType, UserDataType } from '../../context/UserContext'

interface IDashboardCard {
  user?: UserDataType
  image?: string,
}

const DashboardCard = ({user, image} : IDashboardCard) => {

  return (
    <div>
      <div className="profile__card flex h-40">
          <img className="w-20 h-20 rounded-full mr-5 " src={image} alt="man.jpg"  />
          <div className="">
            <div className='font-bold my-2'>{user?.first_name} {user?.last_name}</div>
          </div>
        </div>
    </div>
  )
}

export default DashboardCard