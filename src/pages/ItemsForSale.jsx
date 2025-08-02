import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ItemList from '../components/ItemList';
import ItemFilters from '../components/ItemFilters';
import UserContext from '../contexts/UserContext';
import '../styles/ItemsForSale.css';


// get backendUrl from .env file
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;
// console.log("In ItemsForSale page, the kBaseUrl:", kBaseUrl);

// const sampleListingsData = 
// [
//    {
//        "listing_id": 9,
//        "user_id": 1,
//        "name": "Frank",
//        "category": "Electronics",
//        "description": "very new",
//        "price": "12.00",
//        "location": "Charlotte downtown",
//        "contact_information": "123-456-7890",
//        "created_at": "2025-07-23T16:49:29.324Z",
//        "updated_at": "2025-07-23T16:49:29.324Z",
//        "sold_status": false,
//        "images": []
//    },
//    {
//        "listing_id": 10,
//        "user_id": 1,
//        "name": "Frank",
//        "category": "Electronics",
//        "description": "very new",
//        "price": "12.00",
//        "location": "Charlotte downtown",
//        "contact_information": "123-456-7890",
//        "created_at": "2025-07-23T16:50:51.653Z",
//        "updated_at": "2025-07-23T16:50:51.653Z",
//        "sold_status": false,
//        "images": [
//            {
//                "image_id": 1,
//                "listing_id": 10,
//                "image_url": "image_url.com1"
//            },
//            {
//                "image_id": 2,
//                "listing_id": 10,
//                "image_url": "image_url.com2"
//            }
//        ]
//    },
//    {
//        "listing_id": 6,
//        "user_id": 1,
//        "name": null,
//        "category": null,
//        "description": null,
//        "price": null,
//        "location": null,
//        "contact_information": null,
//        "created_at": "2025-07-22T19:38:37.923Z",
//        "updated_at": "2025-07-22T19:38:37.923Z",
//        "sold_status": false,
//        "images": []
//    },
//    {
//        "listing_id": 12,
//        "user_id": 1,
//        "name": "Frank",
//        "category": "Electronics",
//        "description": "very new",
//        "price": "12.00",
//        "location": "Charlotte downtown",
//        "contact_information": "123-456-7890",
//        "created_at": "2025-07-23T16:56:57.602Z",
//        "updated_at": "2025-07-23T16:56:57.602Z",
//        "sold_status": false,
//        "images": [
//            {
//                "image_id": 5,
//                "listing_id": 12,
//                "image_url": "image_url.com1"
//            },
//            {
//                "image_id": 6,
//                "listing_id": 12,
//                "image_url": "image_url.com2"
//            }
//        ]
//    },
//    {
//        "listing_id": 5,
//        "user_id": 1,
//        "name": null,
//        "category": null,
//        "description": null,
//        "price": null,
//        "location": null,
//        "contact_information": null,
//        "created_at": "2025-07-22T19:37:31.208Z",
//        "updated_at": "2025-07-22T19:37:31.208Z",
//        "sold_status": false,
//        "images": []
//    },
//    {
//        "listing_id": 11,
//        "user_id": 1,
//        "name": "Frank",
//        "category": "Electronics",
//        "description": "very new",
//        "price": "12.00",
//        "location": "Charlotte downtown",
//        "contact_information": "123-456-7890",
//        "created_at": "2025-07-23T16:53:10.007Z",
//        "updated_at": "2025-07-23T16:53:10.007Z",
//        "sold_status": false,
//        "images": [
//            {
//                "image_id": 3,
//                "listing_id": 11,
//                "image_url": "image_url.com1"
//            },
//            {
//                "image_id": 4,
//                "listing_id": 11,
//                "image_url": "image_url.com2"
//            }
//        ]
//    }
// ];

const getAllListingsApi = () => {
  return axios.get(`${kBaseUrl}/listings`)
    .then(response => {
      console.log('In ItemsForSale page: ', response.data)
      return response.data;
    })
    .catch(error => {
      console.log(error);
    })
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

    // if (isLiked) {
    //   // Call backend to unlike
    //   axios.delete(`${kBaseUrl}/users/${curUserId}/favorites/${listingId}`)
    //     .then(() => {
    //       const updatedSet = new Set(userLikedListings);
    //       updatedSet.delete(listingId);
    //       setUserLikedListings(updatedSet);
    //     });
    // } else {
    //   // Call backend to like
    //   axios.post(`${kBaseUrl}/users/${curUserId}/favorites/${listingId}`)
    //     .then(() => {
    //       const updatedSet = new Set(userLikedListings);
    //       updatedSet.add(listingId);
    //       setUserLikedListings(updatedSet);
    //     });
    // }

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
    console.log('I am inside the useEffect')
  }, [])

  return (
    <div>
      <h1 className="items-for-sale-h1">Browse Items for Sale</h1>
      {/* <p>ItemsForSale Page</p> */}
      <ItemFilters onGetFilteredItems={getFilteredItems}/>
      <ItemList 
        listings={filteredItemData}
        userLikedListings={userLikedListings} 
        onToggleLike={toggleLike}
      />
    </div>
  );
}

export default ItemsForSale;