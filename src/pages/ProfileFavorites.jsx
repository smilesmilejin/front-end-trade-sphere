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
  const [userLikedListings, setUserLikedListings] = useState(new Set());
  const curUserId = curUserData.user_id;


  console.log('user Context is now: ', curUserData)



  const getUserFavorites = () => {
    getUserFavoritesApi(curUserId)
      .then(userFavorites => {
        setCurUserFavoritesData(userFavorites);
        const likedSet = new Set((userFavorites || []).map(fav => fav.listing_id));
        setUserLikedListings(likedSet);
      })
      .catch(error => {
        // Optional: Show error message or keep editing mode active
        console.error('Update failed', error);
      });
  };

  // Toggle like/unlike
  const toggleLike = (listingId) => {
    if (!curUserData) {
      alert('Please log in to like items');
      return;
    }
    // const isLiked = userLikedListings.has(listingId);
    const isLiked = (userLikedListings || new Set()).has(listingId);

    if (isLiked) {
      // Call backend to unlike
      axios.delete(`${kBaseUrl}/users/${curUserId}/favorites/${listingId}`)
        .then(() => {
          // Remove from liked set
          const updatedSet = new Set(userLikedListings);
          updatedSet.delete(listingId);
          setUserLikedListings(updatedSet);

        // Remove from favorites array
        setCurUserFavoritesData(prevFavorites =>
          prevFavorites.filter(fav => fav.listing_id !== listingId)
        );

        });
    } 
    
    // else {
    //   // Call backend to like
    //   axios.post(`${kBaseUrl}/users/${curUserId}/favorites/${listingId}`)
    //     .then((response) => {
    //       const updatedSet = new Set(userLikedListings);
    //       updatedSet.add(listingId);
    //       setUserLikedListings(updatedSet);

    //     // Add new favorite to favorites array
    //     // Assuming API returns the newly created favorite object in response.data
    //     if (response.data) {
    //       setCurUserFavoritesData(prevFavorites => [...prevFavorites, response.data]);
    //     }

    //     });
    // }
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
        userLikedListings={userLikedListings} 
        onToggleLike={toggleLike}
      />
    </div>
  );
}

export default ProfileFavorites;