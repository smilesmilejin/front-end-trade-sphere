
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



function ProfileListing() {
  const { curUserData } = useContext(UserContext);
  const [curUserListingsData, setCurUserListingsData] = useState([]);
  const [curUserFavoritesData, setCurUserFavoritesData] = useState([]);
  const [userLikedListings, setUserLikedListings] = useState(new Set());
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
            const updatedSet = new Set(userLikedListings);
            updatedSet.delete(listingId);
            setUserLikedListings(updatedSet);
          });
      } else {
        // Call backend to like
        axios.post(`${kBaseUrl}/users/${curUserId}/favorites/${listingId}`)
          .then(() => {
            const updatedSet = new Set(userLikedListings);
            updatedSet.add(listingId);
            setUserLikedListings(updatedSet);
          });
      }
    };

    useEffect( () => {
      getUserListings();
      getUserFavorites();
      console.log('I am inside the useEffect')
    }, [])




  return (
    <div>
      <h3>My Sell Listings</h3>
      {/* <ItemList listings={curUserListingsData}/> */}
      <ItemList 
        // listings={itemData}
        // listings={sampleListingsData} 
        listings={curUserListingsData}
        userLikedListings={userLikedListings} 
        onToggleLike={toggleLike}
      />

    </div>
  );
}

export default ProfileListing;