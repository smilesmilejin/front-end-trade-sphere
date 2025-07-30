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


// Get user Favorites api
const getUserFavoritesApi = (curUserId) => {
  console.log("Get User Favorites Api:", curUserId);
  return axios.get(`${kBaseUrl}/users/${curUserId}/favorites`) 
    .then(response => { 
      console.log('###### User Favorites API response')
      console.log('User Favorites response:', response.data);
      return response.data;
    })
    .catch (error => {
      console.log('GET User Favorites failed:', error);
      console.log(error);
      // console.log('Login failed:', error);
      throw error;
    });
};



function ProfileFavorites() {
  const { curUserData } = useContext(UserContext);
  const [curUserFavoritesData, setCurUserFavoritesData] = useState([]);

  const curUserId = curUserData.user_id;


  console.log('user Context is now: ', curUserData)



  const getUserFavorites = () => {
    getUserFavoritesApi(curUserId)
      .then(userFavorites => {
        setCurUserFavoritesData(userFavorites)
      })
      .catch(error => {
        // Optional: Show error message or keep editing mode active
        console.error('Update failed', error);
      });
  };

  useEffect( () => {
    getUserFavorites()
    console.log('I am inside the useEffect')
  }, [])

  return (
    <div>
      <h3>User favorites</h3>
      <ItemList 
        // listings={itemData}
        // listings={sampleListingsData} 
        listings={curUserFavoritesData}
      />
    </div>
  );
}

export default ProfileFavorites;