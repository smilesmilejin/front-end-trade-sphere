import { useContext } from 'react';
import NewItemForm from '../components/NewItemForm';
import UserContext from '../contexts/UserContext';
import axios from 'axios';

// get backendUrl from .env file
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;

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
  const curUserId = curUserData.user_id;

  const postItem= (newItemData) => {
    postItemApi(curUserId, newItemData)
    .then(response => {
      alert('✅ Your item was posted successfully!')
      return response.data;
    })
    .catch (error => {
      console.log(error);
      alert('❌ Failed to post the item. Please try again.')
    });
  }


  return (
    <div>
      <NewItemForm onPostItem={postItem}/>
    </div>
  );
}

export default ProfilePostItem;