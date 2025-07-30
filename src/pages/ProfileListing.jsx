
import { useNavigate } from 'react-router';
import { useContext, useState, useEffect } from 'react';

import axios from 'axios';
import UserContext from '../contexts/UserContext';
import ItemList from '../components/ItemList';



// const user = {
//   name: 'John Doe',
//   email: 'john.doe@example.com',
//   address: 'Charlotte, NC'
// };


// get backendUrl from .env file
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;
console.log("kBaseUrl:", kBaseUrl);


// Get user Listings api
const getUserListingsApi = (curUserId) => {
  console.log("Get User Sell Listings Api:", curUserId);
  return axios.get(`${kBaseUrl}/users/${curUserId}/listings`) 
    .then(response => { 
      console.log('###### User Listings API response')
      console.log('User Listings response:', response.data);
      return response.data;
    })
    .catch (error => {
      console.log('GET User Listings failed:', error);
      console.log(error);
      // console.log('Login failed:', error);
      throw error;
    });
};


function ProfileListing() {
  const { curUserData } = useContext(UserContext);
  const [curUserListingsData, setCurUserListingsData] = useState([]);

  const curUserId = curUserData.user_id;


  console.log('user Context is now: ', curUserData)



  const getUserListings = () => {
    getUserListingsApi(curUserId)
      .then(userListings => {
        setCurUserListingsData(userListings)
      })
      .catch(error => {
        // Optional: Show error message or keep editing mode active
        console.error('Get User Listing failed', error);
      });
  };

  useEffect( () => {
    getUserListings()
    console.log('I am inside the useEffect')
  }, [])


  return (
    <div>
      <h3>My Sell Listings</h3>
      <ItemList listings={curUserListingsData}/>
    </div>
  );
}

export default ProfileListing;