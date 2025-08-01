import Logo from '../assets/Logo.png'; 
import axios from 'axios';
import { useNavigate, Link } from 'react-router';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';
import SignupForm from '../components/SignupForm';
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


function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    console.log('Search Keyword in Search Page is: ', query)
//   // Get setters for login status and current user from contexts
//   const { setUserLoginStatus } = useContext(UserLoginStatusContext);
//   const { setCurUserData } = useContext(UserContext);
//   const navigate = useNavigate();

    // const curParams = {params: { query: query }}


   const searchItems = (params) => {
    // console.log('signupnUser function: ');
    searchItemsApi(params)
    .then(itemSearchResults => {
          console.log('############ In searchItems function, searchResult: ', itemSearchResults);

        //   setUserLoginStatus(true); // Mark user as logged in
          setSearchResults(itemSearchResults); // Set current user data in context


        //   alert('Sign up is succesful!');
        //   navigate('/'); // Redirect user to home page after successful signup
    })
    .catch(err => {
      alert('Search failed: ' + (err.response?.data?.error || 'Server error')); // Tries to access the error message from the response, but does so safely using optional chaining. If any part of the chain is undefined or null, it won't throw an error—it will return undefined.|| 'Server error': If err.response?.data?.error is undefined (or falsy), it falls back to 'Server error'.
    });
  };

      useEffect(() => {
        if (!query) return; // Don’t run if query is empty

        searchItems(({params: { query: query }}))
        // setSearchResults([]);

        // searchItemsApi(query)
        // .then(results => {
        //     setSearchResults(results);
        // })
        // .catch(err => {
        //     alert('Search failed: ' + (err.response?.data?.error || 'Server error'));
        // });
    }, [query]); // 🔁 Only runs when query changes

//   searchItems(curParams) // Your current code is causing an infinite loop or repeated requests because searchItems(curParams) is being called directly inside the component body, which means it runs every time the component re-renders — and since setSearchResults() triggers a re-render, it keeps going.

  return (
    <div>
        <h2>Search Page</h2>
        <h2>Search Results for "{query}"</h2>

        {searchResults.length === 0 ? (
            <p>No results found.</p>
        ) : (
            <ul>
            {searchResults.map(item => (
                <>  
                    <div key={item.listing_id}>
                        <li>Listing ID: {item.listing_id}</li>
                        <li> Category: {item.category}</li>
                    </div>
                </>

            ))}
            </ul>
        )}

    </div>
  );
}

export default Search;