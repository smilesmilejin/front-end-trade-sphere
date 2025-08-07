import { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import EditUserProfileForm from '../components/EditUserProfileForm';
import '../styles/Profile.css';


// get backendUrl from .env file
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;

// Update user API
const patchUserApi = (curUserId, updatedUserData) => {

  return axios.patch(`${kBaseUrl}/users/${curUserId}`, updatedUserData) 
    .then(response => { 
      return response.data;
    })
    .catch (error => {
      console.log(error);
      throw error;
    });
};

function Profile() {
  const { curUserData, setCurUserData } = useContext(UserContext);
  const curUserId = curUserData.user_id;
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

  // Converts an ISO 8601 date-time string to a formatted date and time string in UTC.
  const formatUTCDateTime = (isoString) => {
      const date = new Date(isoString);
      
      return date.toLocaleString('en-US', {
          timeZone: 'UTC',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
      }) + ' UTC';
  }
  
  return (
    <div className="profile-info-wrapper">
        {isEditing ? (
          <EditUserProfileForm
            userData={curUserData}
            onUpdateUserProfile={updateUserProfile}
            onCancelUpdateUserProfile={cancelUpdateUserProfile}
          />
        ) : (
          <div className="profile-info">
            <h2 className="profile-page-header">My Profile</h2>

            <div className="profile-details">
              <p>
                <span className="profile-label">👤 Name:</span>
                <span className="profile-value">{curUserData.name}</span>
              </p>
              <p>
                <span className="profile-label">📧 Email:</span>
                <span className="profile-value">{curUserData.email}</span>
              </p>
              <p>
                <span className="profile-label" >🏠 Address:</span>
                <span className="profile-value">{curUserData.address}</span>
              </p>
              <p>
                <span className="profile-label">📅 Account Created:</span>
                <span className="profile-value">{formatUTCDateTime(curUserData.created_at)}</span>
              </p>
              <p>
                <span className="profile-label">🕒 Last Updated:</span>
                <span className="profile-value">{formatUTCDateTime(curUserData.updated_at)}</span>
              </p>
              <button className="profile-info-edit-button"onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>
          </div>
        )}
    </div>
  );
}

export default Profile;