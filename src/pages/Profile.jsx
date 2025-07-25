import { useNavigate } from 'react-router';
import { useContext } from 'react';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';

import axios from 'axios';
import SignupForm from '../components/SignupForm';
import UserContext from '../contexts/UserContext';
import AccountNavbar from '../components/AccountNavbar';


import { Outlet } from 'react-router';

function Profile() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: 'Charlotte, NC'
  };

  
  return (
    <div>
      <h2>My Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button className="edit-button">Edit Profile</button>
      </div>
    </div>
  );
}

export default Profile;