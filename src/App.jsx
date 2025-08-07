import { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from './pages/Home.jsx'; 
import ItemsForSale from './pages/ItemsForSale.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Layout from './components/Layout.jsx';
import UserLoginStatusContext from './contexts/UserLoginStatusContext';
import UserContext from './contexts/UserContext';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import ProfileLayout from './components/ProfileLayout.jsx';
import ProfilePostItem from './pages/ProfilePostItem.jsx';
import ProfileFavorites from './pages/ProfileFavorites.jsx';
import ProfileListing from './pages/ProfileListing.jsx';
import Search from './pages/Search.jsx';
import { Navigate, Outlet } from "react-router";


function App() {
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [curUserData, setCurUserData] = useState(null);

  // Inline RequireAuth component
  const RequireAuth = () => {
    if (!userLoginStatus) {
      return <Navigate to="/login" replace />;
    }
    return <Outlet />;
  };

  return (
    <UserLoginStatusContext value={{userLoginStatus, setUserLoginStatus}}>
      <UserContext value={{curUserData, setCurUserData}}>
        <Router>
          <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="itemsforsale" element={<ItemsForSale />} />
              <Route path="about" element={<About/>} />
              <Route path="contact" element={<Contact/>} />
              <Route path="search" element={<Search/>} />
              
              {/* Protect all /profile routes */}
              <Route element={<RequireAuth />}>
                <Route path="profile" element={<ProfileLayout />}>
                  <Route index element={<Profile />} /> {/* /profile */}
                  <Route path="post-item-to-sell" element={<ProfilePostItem />} />
                  <Route path="my-favorite-listings" element={<ProfileFavorites />} />
                  <Route path="my-sell-listings" element={<ProfileListing />} />
                </Route>
              </Route>

            </Route>
          </Routes>  
        </Router>
      </UserContext>
    </UserLoginStatusContext>
  )
}

export default App
