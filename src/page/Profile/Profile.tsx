import React, { useEffect, useState } from 'react';
import UserApi from '../../api/UserApi';
import Cookies from 'js-cookie';
import ProfileCard from '../../components/ProfileCard/ProfileCard';

const persons = [
  { id: 1, firstname: 'Malcom', lastname: 'Reynolds' },
  { id: 2, firstname: 'Kaylee', lastname: 'Frye' },
  { id: 3, firstname: 'Jayne', lastname: 'Cobb' },
];

function Profile() {
  const token = Cookies.get('access_token');
  const image = require('../../assets/images/man.jpg');
  const userData =
    Cookies.get('user') && JSON.parse(Cookies.get('user') || '{}');

  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    UserApi.getUser(userData.id, token).then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <>
      <div className="profile flex w-full">
        <div className="w-1/3">
          <ProfileCard user={user} image={image} />
        </div>
        <div className="w-2/3 p-20">
          {/* style here */}
          <div className="font-bold italic mb-5">Activies</div>
          <hr />
          <div className="flex flex-col justify-around">
            {persons.map((item) => {
              return (
                <div key={item.id} >
                  <div className="flex p-5">
                    <img
                      className="mr-4 h-20 w-20 rounded-full"
                      src={image}
                      alt="profile"
                    />
                    <div className="info">
                      <div className="italic">{item.firstname} {item.lastname}</div>
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
}

export default Profile;
