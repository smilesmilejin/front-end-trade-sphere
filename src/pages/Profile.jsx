import { useNavigate } from 'react-router';
import { useContext } from 'react';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';

import axios from 'axios';
import SignupForm from '../components/SignupForm';
import UserContext from '../contexts/UserContext';
import AccountNavbar from '../components/AccountNavbar';


import { Outlet } from 'react-router';


const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  address: 'Charlotte, NC'
};

function Profile() {
  const { curUserData } = useContext(UserContext);

  console.log('user Context is now: ', curUserData)



  // if (!curUserData) {
  //   return <p>Loading profile...</p>; // or redirect, or show fallback
  // };

  
  return (
    <div>
      <h2>My Profile</h2>
      <div className="profile-info">
        {/* <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p> */}

        <p><strong>User ID:</strong> {curUserData.user_id}</p>
        <p><strong>Name:</strong> {curUserData.name}</p>
        <p><strong>Email:</strong> {curUserData.email}</p>
        <p><strong>Address:</strong> {curUserData.address}</p>
        <p><strong>Account Created:</strong> {curUserData.created_at}</p>
        <p><strong>Last Updated:</strong> {curUserData.updated_at}</p>

        <button className="edit-button">Edit Profile</button>
      </div>
    </div>
  );
}

export default Profile;