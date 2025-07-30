import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from '../components/ItemList';
import ItemFilters from '../components/ItemFilters';
import Item from '../components/Item';

// get backendUrl from .env file
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;
console.log("In ItemsForSale page, the kBaseUrl:", kBaseUrl);


const sampleListingsData = 
[
   {
       "listing_id": 9,
       "user_id": 1,
       "name": "Frank",
       "category": "Electronics",
       "description": "very new",
       "price": "12.00",
       "location": "Charlotte downtown",
       "contact_information": "123-456-7890",
       "created_at": "2025-07-23T16:49:29.324Z",
       "updated_at": "2025-07-23T16:49:29.324Z",
       "sold_status": false,
       "images": []
   },
   {
       "listing_id": 10,
       "user_id": 1,
       "name": "Frank",
       "category": "Electronics",
       "description": "very new",
       "price": "12.00",
       "location": "Charlotte downtown",
       "contact_information": "123-456-7890",
       "created_at": "2025-07-23T16:50:51.653Z",
       "updated_at": "2025-07-23T16:50:51.653Z",
       "sold_status": false,
       "images": [
           {
               "image_id": 1,
               "listing_id": 10,
               "image_url": "image_url.com1"
           },
           {
               "image_id": 2,
               "listing_id": 10,
               "image_url": "image_url.com2"
           }
       ]
   },
   {
       "listing_id": 6,
       "user_id": 1,
       "name": null,
       "category": null,
       "description": null,
       "price": null,
       "location": null,
       "contact_information": null,
       "created_at": "2025-07-22T19:38:37.923Z",
       "updated_at": "2025-07-22T19:38:37.923Z",
       "sold_status": false,
       "images": []
   },
   {
       "listing_id": 12,
       "user_id": 1,
       "name": "Frank",
       "category": "Electronics",
       "description": "very new",
       "price": "12.00",
       "location": "Charlotte downtown",
       "contact_information": "123-456-7890",
       "created_at": "2025-07-23T16:56:57.602Z",
       "updated_at": "2025-07-23T16:56:57.602Z",
       "sold_status": false,
       "images": [
           {
               "image_id": 5,
               "listing_id": 12,
               "image_url": "image_url.com1"
           },
           {
               "image_id": 6,
               "listing_id": 12,
               "image_url": "image_url.com2"
           }
       ]
   },
   {
       "listing_id": 5,
       "user_id": 1,
       "name": null,
       "category": null,
       "description": null,
       "price": null,
       "location": null,
       "contact_information": null,
       "created_at": "2025-07-22T19:37:31.208Z",
       "updated_at": "2025-07-22T19:37:31.208Z",
       "sold_status": false,
       "images": []
   },
   {
       "listing_id": 11,
       "user_id": 1,
       "name": "Frank",
       "category": "Electronics",
       "description": "very new",
       "price": "12.00",
       "location": "Charlotte downtown",
       "contact_information": "123-456-7890",
       "created_at": "2025-07-23T16:53:10.007Z",
       "updated_at": "2025-07-23T16:53:10.007Z",
       "sold_status": false,
       "images": [
           {
               "image_id": 3,
               "listing_id": 11,
               "image_url": "image_url.com1"
           },
           {
               "image_id": 4,
               "listing_id": 11,
               "image_url": "image_url.com2"
           }
       ]
   }
];

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

function ItemsForSale() {
  const [itemData, setItemData] = useState([]);
  const [filteredItemData, setFilteredItemData] = useState([]);

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

    // // Price sorting
    // if (filters.priceSort !== '') {
    //   if (filters.priceSort === 'price-asc') {
    //     filtered.sort((a, b) => a.price - b.price);
    //   } else if (filters.priceSort === 'price-desc') {
    //     filtered.sort((a, b) => b.price - a.price);
    //   };
    // }

    // // Date sorting
    // if (filters.dateSort !== '') {
    //   if (filters.dateSort === 'date-asc') {
    //     filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    //   } else if (filters.dateSort === 'date-desc') {
    //     filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    //   };
    // }

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



    console.log('##### Curretn Filtered Item Data: ', filtered)
    // return filteredItemData;

    setFilteredItemData(filtered);
  };

  useEffect( () => {
    getAllListings();
    console.log('I am inside the useEffect')
  }, [])

  return (
    <div>
      <h1>ItemsForSale Page</h1>
      <p>ItemsForSale Page</p>
      <ItemFilters onGetFilteredItems={getFilteredItems}/>
      <ItemList 
        // listings={itemData}
        // listings={sampleListingsData} 
        listings={filteredItemData}
      />
    </div>
  );
}

export default ItemsForSale;