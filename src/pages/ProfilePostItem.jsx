// PostItem.jsx
import { useState, useContext } from 'react';
import NewItemForm from '../components/NewItemForm';
import UserContext from '../contexts/UserContext';
import axios from 'axios';

// get backendUrl from .env file
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;
console.log("In ItemsForSale page, the kBaseUrl:", kBaseUrl);


// post new Listing to the database
const postItemApi = (userId, newItemData) => {
  return axios.post(`${kBaseUrl}/users/${userId}/listings`, newItemData)
    .then(response => {
      console.log(response.data);
      return response.data;
    })
      .catch (error => {
        console.log(error);
      });
};


function ProfilePostItem() {
  const { curUserData } = useContext(UserContext);

  console.log('user Context is now: ', curUserData);

  // const [successMessage, setSuccessMessage] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  const curUserId = curUserData.user_id;

  const postItem= (newItemData) => {
    postItemApi(curUserId, newItemData)
    .then(response => {
      // setSuccessMessage('✅ Your item was posted successfully!');
      alert('✅ Your item was posted successfully!')
      // setErrorMessage('');
      return response.data;
    })
    .catch (error => {
      console.log(error);
      alert('❌ Failed to post the item. Please try again.')
      // setErrorMessage('❌ Failed to post the item. Please try again.');
      // setSuccessMessage('');
    });
  }


  return (
    <div>
      <h3>Post Item to Sell</h3>
      <p>Post a new item for sale here.</p>
      {/* Show success or error message */}
      {/* {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )} */}

      <NewItemForm onPostItem={postItem}/>

    </div>
  );
}

export default ProfilePostItem;