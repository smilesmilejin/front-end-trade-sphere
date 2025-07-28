import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from '../components/ItemList';

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
}

function ItemsForSale() {
  const [listingData, setListingData] = useState([]);

  const getAllListings = () => {
    return getAllListingsApi()
      .then((listings) => {
        setListingData(listings);
      });
  };



  useEffect( () => {
    getAllListings();
    console.log('I am inside the useEffect')
  }, [])

  return (
    <div>
      <h1>ItemsForSale Page</h1>
      <p>ItemsForSale Page</p>

      <ItemList 
        listings={listingData}
        // listings={sampleListingsData} 
      />
    </div>
  );
}

export default ItemsForSale;