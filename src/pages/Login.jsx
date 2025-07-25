import Logo from '../assets/Logo.png'; 
// import './Login.css'; 
import { useContext } from 'react';
// import { UserLoginStatusContext } from '../App';
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';


import axios from 'axios';

// get backendUrl from .env file
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;
console.log("kBaseUrl:", kBaseUrl);

// Log in 
const loginUserApi = (email) => {
  return axios.post(`${kBaseUrl}/users/login`, {"email": email}) 
    .then(response => { 
      console.log(response);
      console.log('Login response:', response.data);
      return response.data;
    })
    .catch (error => {
      console.log(error);
      console.log('Login failed:', error);
      throw error;
    });
};


function Login() {
  const { setUserLoginStatus } = useContext(UserLoginStatusContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Normally you'd validate login here
    // For now, just set login status to true
    try {
      await loginUserApi('abc@gmail.com');
      setUserLoginStatus(true);
      navigate('/');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.error || 'Server unreachable'));
    }

    // setUserLoginStatus(true);

    // // Redirect user to home page or dashboard after login
    // navigate('/');
  };

  return (
    <div>
      <header className="logo">
        <img src={Logo} alt="My Logo" />
        <h1>TradeSphere</h1>
      </header>
      <h2>Log In</h2>
      {/* <form> */}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;