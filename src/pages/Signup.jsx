import Logo from '../assets/Logo.png'; 
// import './signup.css'; 
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';

import axios from 'axios';
import SignupForm from '../components/SignupForm';
import UserContext from '../contexts/UserContext';

// get backendUrl from .env file
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;
console.log("kBaseUrl:", kBaseUrl);


// Sign up user api
const signupUserApi = (signupData) => {
  console.log("sign up user with data:", signupData);

  return axios.post(`${kBaseUrl}/users`, signupData) 
    .then(response => { 
      console.log('###### Signup User API response')
      // console.log(response);
      console.log('Signup response:', response.data);
      return response.data;
    })
    .catch (error => {
      console.log('Signup failed:', error);
      console.log(error);
      // console.log('Login failed:', error);
      throw error;
    });
};


function Signup() {
  const { setUserLoginStatus } = useContext(UserLoginStatusContext);
  const { setCurUserData } = useContext(UserContext);
  const navigate = useNavigate();

   const signupUser = (signupData) => {
    console.log('signupnUser function: ');

    signupUserApi(signupData)
    .then(newUser => {
          console.log('############ in signup User, current user is: ', newUser);

          setUserLoginStatus(true);
          setCurUserData(newUser);

          alert('Sign up is succesful!');

          navigate('/'); // Redirect user to home page or dashboard after login
    })
    .catch(err => {
      alert('Signup failed: ' + (err.response?.data?.error || 'Server error')); // Tries to access the error message from the response, but does so safely using optional chaining. If any part of the chain is undefined or null, it won't throw an error—it will return undefined.|| 'Server error': If err.response?.data?.error is undefined (or falsy), it falls back to 'Server error'.
    });
  };

  return (

    <div>
        <header className="logo">
            <img src={Logo} alt="My Logo" />
            <h1>TradeSphere</h1>
        </header>
      <h2>Sign Up</h2>

      <SignupForm onSignupUser={signupUser} />
    </div>
  );
}

export default Signup;