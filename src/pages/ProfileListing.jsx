
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

// Update user Item api
// PATCH /users/<user_id>/listings/<listing_id>
const patchUserItemApi = (curUserId, listingId, updatedItemData) => {
  console.log("updated User data:", updatedItemData);

  return axios.patch(`${kBaseUrl}/users/${curUserId}/listings/${listingId}`, updatedItemData) 
    .then(response => { 
      console.log('###### Updated User Item response')
      console.log('Updated User Item response:', response.data);
      return response.data;
    })
    .catch (error => {
      console.log('Edit User Item failed:', error);
      console.log(error);
      throw error;
    });
};


// DELETE user Item api
// DELETE /users/<user_id>/listings/<listing_id>
const deleteUserItemApi = (curUserId, listingId) => {
  return axios.delete(`${kBaseUrl}/users/${curUserId}/listings/${listingId}`) 
    .then(response => { 
      console.log('###### Delete User Item response')
      console.log('Delete User Item response:', response.data);
      return response.data;
    })
    .catch (error => {
      console.log('Delete User Item failed:', error);
      console.log(error);
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

    const updateUserItem = (listingId, updatedUserData) => {
      patchUserItemApi(curUserId, listingId, updatedUserData)
        .then(newUserItemData => {
          // Update listings: replace the updated listing in curUserListingsData
          setCurUserListingsData(prevListings => 
            prevListings.map(listing => 
              listing.listing_id === listingId ? newUserItemData : listing
            )
          );
          alert('User Item is Updated!')
          // setIsEditing(false); // NOT quite necesasry , since setCurUserData caues the whole page to re render, and isEditing, state go back to default
        })
        .catch(error => {
          // Optional: Show error message or keep editing mode active
          console.error('Update failed', error);
        });
    };

    const cancelUpdateUserItem = () => {
      console.log('Cancel Update User Item');
    }

    const deleteUserItem = (listingId) => {
      deleteUserItemApi(curUserId, listingId)
        .then(() => {
          // Update listings: replace the updated listing in curUserListingsData
          setCurUserListingsData(prevListings => 
            prevListings.filter(listing => 
              listing.listing_id !== listingId
            )
          );
          alert('User Item is deleted!')
          // setIsEditing(false); // NOT quite necesasry , since setCurUserData caues the whole page to re render, and isEditing, state go back to default
        })
        .catch(error => {
          // Optional: Show error message or keep editing mode active
          console.error('User Item Delete is failed', error);
        });
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
        editButton={<button>Edit Listing</button>}
        onUpdateUserItem={updateUserItem}
        onCancelUpdateUserItem={cancelUpdateUserItem}
        deleteButton={<button>Delete Listing</button>}
        onDeleteUserItem={deleteUserItem}
      />

    </div>
  );
}

export default ProfileListing;