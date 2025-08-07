import axios from 'axios';
import ItemList from '../components/ItemList';
import ItemFilters from '../components/ItemFilters';
import UserContext from '../contexts/UserContext';

import { useSearchParams } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import '../styles/Search.css';

// Get backend URL from environment variables .env
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;

// Function to call backend signup API with user data
const searchItemsApi = (params) => {
  return axios.get(`${kBaseUrl}/search`, params) 
    .then(response => { 
      return response.data;
    })
    .catch (error => {
      console.log(error);
      throw error;
    });
};


// Get user Favorites api
const getUserFavoritesApi = (curUserId) => {
  return axios.get(`${kBaseUrl}/users/${curUserId}/favorites`) 
    .then(response => { 
      return response.data;
    })
    .catch (error => {
      console.log(error);
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


function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchParams] = useSearchParams();
    const [filteredItemData, setFilteredItemData] = useState([]);
    const { curUserData } = useContext(UserContext);
    const [userLikedListings, setUserLikedListings] = useState(new Set());
    const curUserId = curUserData?.user_id;

    const query = searchParams.get('query') || '';


   const searchItems = (params) => {
    searchItemsApi(params)
    .then(itemSearchResults => {
          setSearchResults(itemSearchResults); 
          setFilteredItemData(itemSearchResults);
    })
    .catch(err => {
      alert('Search failed: ' + (err.response?.data?.error || 'Server error')); // Tries to access the error message from the response, but does so safely using optional chaining. If any part of the chain is undefined or null, it won't throw an error—it will return undefined.|| 'Server error': If err.response?.data?.error is undefined (or falsy), it falls back to 'Server error'.
    });
  };

  const getFilteredItems = (filters) => {
    if (!searchResults || searchResults.length === 0) return [];

    let filtered = [...searchResults];

    // Category filter
    if (filters.category !== '') {
      filtered = filtered.filter(item => item.category === filters.category);
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

    setFilteredItemData(filtered);
  };

  const getUserFavorites = () => {
    getUserFavoritesApi(curUserId)
      .then(userFavorites => {
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


    useEffect(() => {
      if (!query) return; // Don’t run if query is empty

      searchItems(({params: { query: query }}))

      if (curUserId) {
        getUserFavorites();
      };

    }, [query]); // Only runs when query changes


  return (
    <div>
        <h1 className="search-page-h1">Search Results for "{query}"</h1>

        <ItemFilters onGetFilteredItems={getFilteredItems}/>

        <h3 className='search-page-numbers'>{filteredItemData.length} Items</h3>

        <ItemList 
          listings={filteredItemData}
          userLikedListings={userLikedListings} 
          onToggleLike={toggleLike}
        />

    </div>
  );
}

export default Search;