import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ItemList from '../components/ItemList';
import ItemFilters from '../components/ItemFilters';
import UserContext from '../contexts/UserContext';
import '../styles/ItemsForSale.css';


// get backendUrl from .env file
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;
// console.log("In ItemsForSale page, the kBaseUrl:", kBaseUrl);

const getAllListingsApi = () => {
  return axios.get(`${kBaseUrl}/listings`)
    .then(response => {
      // console.log('In ItemsForSale page: ', response.data)
      return response.data;
    })
    .catch(error => {
      console.log(error);
    })
};

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


// POST user favorites API
const postUserFavoriteApi = async (userId, listingId) => {
  try {
    await axios.post(`${kBaseUrl}/users/${userId}/favorites/${listingId}`);
  } catch (error) {
    console.error('Error liking item:', error);
    throw error;
  }
};


function ItemsForSale() {
  const [itemData, setItemData] = useState([]);
  const [filteredItemData, setFilteredItemData] = useState([]);

  const { curUserData } = useContext(UserContext);
  const [userLikedListings, setUserLikedListings] = useState(new Set());
  const curUserId = curUserData?.user_id;

  const getAllListings = () => {
    return getAllListingsApi()
      .then((listings) => {
        setItemData(listings);
        setFilteredItemData(listings);
      });
  };

  const getFilteredItems = (filters) => {
    if (!itemData || itemData.length === 0) return [];

    let filtered = [...itemData];

    // console.log('##### filtered: ', filtered)

    // Category filter
    if (filters.category !== '') {
      filtered = filtered.filter(item => item.category === filters.category);
      // console.log('##### filtered category: ', filtered)
    }

    // Availability filter
    if (filters.availability !== '') {
      if (filters.availability === 'available') {
        filtered = filtered.filter(item => item.sold_status === false); // Available = not sold
      } else if (filters.availability === 'sold') {
        filtered = filtered.filter(item => item.sold_status === true); // Sold = sold
      }
    }

    filtered.sort((a, b) => {
      // Price sort
      if (filters.priceSort !== '') {
        const priceA = a.price;
        const priceB = b.price;

        // Only sort by price if the prices are different. If they’re equal, continue to the next sorting criterion.
        if (priceA !== priceB) {
          if (filters.priceSort === 'price-asc') {
            return priceA - priceB; // Sorts in ascending order. 
          } else if (filters.priceSort === 'price-desc') {
            return priceB - priceA; // Sorts in descending order.
          }
        }
      }

      // Date sort
      if (filters.dateSort !== '') {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        if (dateA.getTime() !== dateB.getTime()) {
          if (filters.dateSort === 'date-asc') {
            return dateA - dateB;
          } else if (filters.dateSort === 'date-desc') {
            return dateB - dateA; // Sort in descending date order.
          }
        }
      }

      return 0; // If all compared values are equal (price, date, name), return 0 to leave the order unchanged.
    });

    // console.log('##### Current Filtered Item Data: ', filtered);
    setFilteredItemData(filtered);
  };

  const getUserFavorites = () => {
    getUserFavoritesApi(curUserId)
      .then(userFavorites => {
        // const likedSet = new Set(userFavorites.data.map(fav => fav.listing_id));
        const likedSet = new Set((userFavorites || []).map(fav => fav.listing_id));
        setUserLikedListings(likedSet);
      })
      .catch(error => {
        // Optional: Show error message or keep editing mode active
        console.error('Update failed', error);
      });
  };

  const deleteUserFavorite = (userId, listingId) => {
    deleteUserFavoriteApi(userId, listingId)
      .then(() => {
        const updatedSet = new Set(userLikedListings);
        updatedSet.delete(listingId);
        setUserLikedListings(updatedSet);
      })
      .catch(error => {
        console.error('Error deleting user favorite:', error);
      });
  };

  const postUserFavorite = (userId, listingId) => {
    postUserFavoriteApi(userId, listingId)
      .then(() => {
          const updatedSet = new Set(userLikedListings);
          updatedSet.add(listingId);
          setUserLikedListings(updatedSet);
      })
      .catch(error => {
        console.error('Error adding user favorite:', error);
      });
  };

  // Toggle like/unlike
  const toggleLike = (listingId) => {
    if (!curUserData) {
      alert('Please log in to like items');
      return;
    }

    const isLiked = (userLikedListings || new Set()).has(listingId);

    if (isLiked) {
      deleteUserFavorite(curUserId, listingId);
    } else {
      postUserFavorite(curUserId, listingId);
    }
  };

  useEffect( () => {
    getAllListings();
    if (curUserId) {
      getUserFavorites();
    };
    // console.log('I am inside the useEffect')
  }, [])

  return (
    <div>
      <h1 className="items-for-sale-h1">Browse Items for Sale</h1>
      <ItemFilters onGetFilteredItems={getFilteredItems}/>
      <h3 className='items-for-sale-numbers'>{filteredItemData.length} Items</h3>
      <ItemList 
        listings={filteredItemData}
        userLikedListings={userLikedListings} 
        onToggleLike={toggleLike}
      />
    </div>
  );
}

export default ItemsForSale;