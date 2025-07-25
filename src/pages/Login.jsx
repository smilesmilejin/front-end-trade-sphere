import Logo from '../assets/Logo.png'; 
// import './Login.css'; 
import { useContext } from 'react';
// import { UserLoginStatusContext } from '../App';
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';


import axios from 'axios';
import LoginForm from '../components/LoginForm';

import UserContext from '../contexts/UserContext';

// get backendUrl from .env file
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;
console.log("kBaseUrl:", kBaseUrl);


// Log in 
const loginUserApi = (loginData) => {
  console.log("Login user with data:", loginData);

  return axios.post(`${kBaseUrl}/users/login`, loginData) 
    .then(response => { 
      console.log('###### Log in User API response')
      console.log(response);
      console.log('Login response:', response.data);
      return response.data;
    })
    .catch (error => {
      console.log('Login failed:', error);
      console.log(error);
      // console.log('Login failed:', error);
      throw error;
    });
};


function Login() {
  const { setUserLoginStatus } = useContext(UserLoginStatusContext);
  const { setCurUserData } = useContext(UserContext);
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Normally you'd validate login here
  //   // For now, just set login status to true
  //   try {
  //     await loginUserApi('abc@gmail.com');
  //     setUserLoginStatus(true);
  //     navigate('/');
  //   } catch (err) {
  //     alert('Login failed: ' + (err.response?.data?.error || 'Server unreachable'));
  //   }

  //   // setUserLoginStatus(true);

  //   // // Redirect user to home page or dashboard after login
  //   // navigate('/');
  // };

 const loginUser = (loginData) => {
    console.log('loginUser function: ');

    loginUserApi(loginData)
    .then(newUser => {
          console.log('############ in loginUser, current user is: ', newUser);

          setUserLoginStatus(true);
          setCurUserData(newUser);

          alert('Login is succesful!');

          navigate('/'); // Redirect user to home page or dashboard after login
    })
    .catch(err => {
      alert('Login failed: ' + (err.response?.data?.error || 'Server error')); // Tries to access the error message from the response, but does so safely using optional chaining. If any part of the chain is undefined or null, it won't throw an error—it will return undefined.|| 'Server error': If err.response?.data?.error is undefined (or falsy), it falls back to 'Server error'.
    });
  };

  return (
    <div>
      <header className="logo">
        <img src={Logo} alt="My Logo" />
        <h1>TradeSphere</h1>
      </header>
      {/* <h2>Log In</h2> */}

      <LoginForm onLoginUser={loginUser} />
    </div>
  );
}

export default Login;