import { useState } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from './pages/Home.jsx'; 
import ItemsForSale from './pages/ItemsForSale.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Layout from './components/Layout.jsx';
// import Header from './components/Header.jsx';
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

// import { createContext } from 'react';
// const UserLoginStatusContext = createContext();
// due to fast fresh error move this to contexts/UserLoginStatusContext.jsx
// export const UserLoginStatusContext = createContext();



function App() {
  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )

  const [userLoginStatus, setUserLoginStatus] = useState(false);
  // const UserLoginStatusContext = createContext();
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
              {/* Testing header */}
              {/* <Route path="header" element={<Header />} /> */}
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



              {/* <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>

              <Route path="concerts">
                <Route index element={<ConcertsHome />} />
                <Route path=":city" element={<City />} />
                <Route path="trending" element={<Trending />} />
              </Route> */}
              </Route>
            </Routes>  
          </Router>
        </UserContext>
    </UserLoginStatusContext>
  )
}

export default App
