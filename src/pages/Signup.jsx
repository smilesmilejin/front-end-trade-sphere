import Logo from '../assets/Logo.png'; 
import axios from 'axios';
import { useNavigate, Link } from 'react-router';
import { useContext } from 'react';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';
import SignupForm from '../components/SignupForm';
import UserContext from '../contexts/UserContext';
import '../styles/Signup.css';


// Get backend URL from environment variables .env
const kBaseUrl = import.meta.env.VITE_APP_BACKEND_URL;


// Function to call backend signup API with user data
const signupUserApi = (signupData) => {
  return axios.post(`${kBaseUrl}/users`, signupData) 
    .then(response => { 
      return response.data;
    })
    .catch (error => {
      // console.log('Signup failed:', error);
      console.log(error);
      throw error;
    });
};


function Signup() {
  // Get setters for login status and current user from contexts
  const { setUserLoginStatus } = useContext(UserLoginStatusContext);
  const { setCurUserData } = useContext(UserContext);
  const navigate = useNavigate();

   const signupUser = (signupData) => {
    signupUserApi(signupData)
    .then(newUser => {
          setUserLoginStatus(true); // Mark user as logged in
          setCurUserData(newUser); // Set current user data in context

          alert('Sign up is succesful!');
          navigate('/'); // Redirect user to home page after successful signup
    })
    .catch(err => {
      alert('Signup failed: ' + (err.response?.data?.error || 'Server error')); // Tries to access the error message from the response, but does so safely using optional chaining. If any part of the chain is undefined or null, it won't throw an error—it will return undefined.|| 'Server error': If err.response?.data?.error is undefined (or falsy), it falls back to 'Server error'.
    });
  };

  return (
    <div className='sign-up-container'>
        <Link to="/" className="logo">
            <img src={Logo} alt="My Logo" />
            <h1>TradeSphere</h1>
        </Link>

        <SignupForm onSignupUser={signupUser} />
    </div>
  );
}

export default Signup;