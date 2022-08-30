import React from 'react'

interface IProfileCard {
  user: {
    first_name: string,
    last_name: string
  },
  image: string
}

const ProfileCard = ({user, image} : IProfileCard) => {
  return (
    <div>
      <div className="profile__card flex flex-col items-center bg-gray-100 py-20">
          <img className="w-40 h-40 rounded-full mb-5" src={image} alt="man.jpg"  />
          <div className='mb-5'>{user?.first_name} {user?.last_name}</div>
          <hr className='border-black w-2/3'/>
          <div className="follows flex flex-col mb-3">
            <div className="flex mb-3">
              <div className="flex items-center px-5 py-2 flex-col">
                <div>50</div>
                <div>followers</div>
              </div>
              <div className="flex items-center px-5 py-2 flex-col">
                <div>20</div>
                <div>following</div>
              </div>
            </div>
            <button className='rounded-md border-2 bg-gray-600 text-white px-4 py-2'>UNFOLLOW</button>
          </div>
          <div>Learned 20 words</div>
        </div>
    </div>
  )
}

export default ProfileCard