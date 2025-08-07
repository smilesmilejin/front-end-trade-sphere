import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import ItemList from '../components/ItemList';
import '../styles/ProfileFavorites.css';


// get backendUrl from .env file
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;
// console.log("kBaseUrl:", kBaseUrl);


// Get user Favorites api
const getUserFavoritesApi = (curUserId) => {
  // console.log("Get User Favorites Api:", curUserId);
  return axios.get(`${kBaseUrl}/users/${curUserId}/favorites`) 
    .then(response => { 
      // console.log('###### User Favorites API response')
      // console.log('User Favorites response:', response.data);
      return response.data;
    })
    .catch (error => {
      // console.log('GET User Favorites failed:', error);
      console.log(error);
      // console.log('Login failed:', error);
      throw error;
    });
};

// DELETE user favorites API
const deleteUserFavoriteApi = async (userId, listingId) => {
  try {
    await axios.delete(`${kBaseUrl}/users/${userId}/favorites/${listingId}`);
  } catch (error) {
    console.error('Error unliking item:', error);
    throw error;
  }
};

function ProfileFavorites() {
  const { curUserData } = useContext(UserContext);
  const [curUserFavoritesData, setCurUserFavoritesData] = useState([]);
  const [userLikedListings, setUserLikedListings] = useState(new Set());
  const curUserId = curUserData.user_id;

  // console.log('user Context is now: ', curUserData)

  const getUserFavorites = () => {
    getUserFavoritesApi(curUserId)
      .then(userFavorites => {
        // console.log('User Favorites Data is: ', userFavorites)
        setCurUserFavoritesData(userFavorites);
        const likedSet = new Set((userFavorites || []).map(fav => fav.listing_id));
        setUserLikedListings(likedSet);
      })
      .catch(error => {
        console.error('Update failed', error);
      });
  };

  const deleteUserFavorite = (userId, listingId) => {
    deleteUserFavoriteApi(userId, listingId)
      .then(() => {
        const updatedSet = new Set(userLikedListings);
        updatedSet.delete(listingId);
        setUserLikedListings(updatedSet);

        // Remove from favorites array
        setCurUserFavoritesData(prevFavorites =>
          prevFavorites.filter(fav => fav.listing_id !== listingId)
        );
      })
      .catch(error => {
        console.error('Error deleting user favorite:', error);
      });
  };

  // Toggle like/unlike
  const toggleLike = (listingId) => {
    if (!curUserData) {
      alert('Please log in to like items');
      return;
    }

    const isLiked = (userLikedListings || new Set()).has(listingId);

    // if (isLiked) {
    //   // Call backend to unlike
    //   axios.delete(`${kBaseUrl}/users/${curUserId}/favorites/${listingId}`)
    //     .then(() => {
    //       // Remove from liked set
    //       const updatedSet = new Set(userLikedListings);
    //       updatedSet.delete(listingId);
    //       setUserLikedListings(updatedSet);

    //       // Remove from favorites array
    //       setCurUserFavoritesData(prevFavorites =>
    //         prevFavorites.filter(fav => fav.listing_id !== listingId)
    //       );
    //     });
    // }

    if (isLiked) {
      deleteUserFavorite(curUserId, listingId);
    };
  };

  useEffect( () => {
    getUserFavorites()
    // console.log('I am inside the useEffect')
  }, [])

  return (
    <div>
      <h2 className="profile-favorites-page-header">User favorites</h2>
      <ItemList 
        listings={curUserFavoritesData}
        userLikedListings={userLikedListings} 
        onToggleLike={toggleLike}
      />
    </div>
  );
}

export default ProfileFavorites;