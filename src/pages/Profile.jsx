import { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import EditUserProfileForm from '../components/EditUserProfileForm';

// get backendUrl from .env file
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;
// console.log("kBaseUrl:", kBaseUrl);

// Update user API
const patchUserApi = (curUserId, updatedUserData) => {
  console.log("updated User data:", updatedUserData);

  return axios.patch(`${kBaseUrl}/users/${curUserId}`, updatedUserData) 
    .then(response => { 
      console.log('###### Updated User API response')
      console.log('Updated User response:', response.data);
      return response.data;
    })
    .catch (error => {
      console.log('Edit User failed:', error);
      throw error;
    });
};

function Profile() {
  const { curUserData, setCurUserData } = useContext(UserContext);
  const curUserId = curUserData.user_id;
  // console.log('user Context is now: ', curUserData)
  const [isEditing, setIsEditing] = useState(false);


  const updateUserProfile = (updatedUserData) => {
    patchUserApi(curUserId, updatedUserData)
      .then(newUserData => {
        setCurUserData(newUserData);
        setIsEditing(false); // NOT quite necesasry , since setCurUserData caues the whole page to re render, and isEditing, state go back to default
        alert('Profile update is successful!');
      })
      .catch(error => {
        // Optional: Show error message or keep editing mode active
        console.error('Update failed', error);
      });
  };

  const cancelUpdateUserProfile = () => {
    setIsEditing(false);
  };

  
  return (
    <div>
      <h2>My Profile</h2>
      <div className="profile-info">
        {isEditing ? (
          <EditUserProfileForm
            userData={curUserData}
            onUpdateUserProfile={updateUserProfile}
            onCancelUpdateUserProfile={cancelUpdateUserProfile}
          />
        ) : (
          <div className="profile-info">
            <p><strong>👤 Name:</strong> {curUserData.name}</p>
            <p><strong>📧 Email:</strong> {curUserData.email}</p>
            <p><strong>🏠 Address:</strong> {curUserData.address}</p>
            <p><strong>📅 Account Created:</strong> {curUserData.created_at}</p>
            <p><strong>🕒 Last Updated:</strong> {curUserData.updated_at}</p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;