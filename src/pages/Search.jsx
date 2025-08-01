import axios from 'axios';
import ItemList from '../components/ItemList';
import ItemFilters from '../components/ItemFilters';
import UserContext from '../contexts/UserContext';

import { useSearchParams } from 'react-router';
import { useState, useEffect, useContext } from 'react';

// Get backend URL from environment variables .env
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;
// console.log("kBaseUrl:", kBaseUrl);

// Function to call backend signup API with user data
const searchItemsApi = (params) => {
  console.log("SearchItemAPI with params:", params);

  console.log()
  return axios.get(`${kBaseUrl}/search`, params) 
    .then(response => { 
      console.log('###### Search API response')
      console.log('Search Response:', response.data);
      return response.data;
    })
    .catch (error => {
      console.log('Search failed:', error);
      console.log(error);
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

    console.log('Search Keyword in Search Page is: ', query)


   const searchItems = (params) => {
    // console.log('signupnUser function: ');
    searchItemsApi(params)
    .then(itemSearchResults => {
          console.log('############ In searchItems function, searchResult: ', itemSearchResults);
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

    console.log('##### filtered: ', filtered)

    // Category filter
    if (filters.category !== '') {
      filtered = filtered.filter(item => item.category === filters.category);
      console.log('##### filtered category: ', filtered)
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
        <h2>Search Page</h2>
        <h2>Search Results for "{query}"</h2>
        <h3>There are total {searchResults.length} items that matches your search</h3>

        {searchResults.length === 0 ? (
            <p>No results found.</p>
        ) : (
            <ul>
            {searchResults.map(item => (
              <li key={item.listing_id}>
                Listing ID: {item.listing_id} <br />
                Category: {item.category}
              </li>
            ))}
            </ul>
        )}

        <h3>After Filtering: There are total {filteredItemData.length} items that matches your search</h3>

        <ItemFilters onGetFilteredItems={getFilteredItems}/>
        <ItemList 
          listings={filteredItemData}
          userLikedListings={userLikedListings} 
          onToggleLike={toggleLike}
        />

    </div>
  );
}

export default Search;