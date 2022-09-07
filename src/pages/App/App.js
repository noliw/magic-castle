

import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import ShopSearchPage from "../ShopSearchPage/ShopSearchPage";
import ShopDetailsPage from "../ShopDetails/ShopDetailsPage";
import UserPage from "../UserPage/UserPage";

import NavBar from "../../components/NavBar/NavBar";

import userService from "../../services/userService";
import * as GoogleAPI from "../../services/googleplaces-api";
import * as ShopsAPI from "../../services/shops-api";

import "./App.css";

const App = () => {
  const [user, setUser] = useState('');
  const [shops, setShops] = useState([]);
  const [userShops, setUserShops] = useState([]);

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };

  const handleSignupOrLogin = () => {
    setUser(userService.getUser());
  };

  const handleSearchSubmit = async (event, searchTerm) => {
    event.preventDefault();
    const searchResults = await GoogleAPI.search(searchTerm);
    setShops(searchResults.data.results);
  };

  const handleAddShop = async (shopData) => {
    const newShop = await ShopsAPI.create(shopData);
    console.log("newShop in app.js -->", newShop);
    setUserShops([...userShops, newShop]);
  };

  useEffect(() => console.log(shops))

  return (
    <>
      <NavBar
        user={user}
        handleLogout={handleLogout}
      />

      <Routes>
        <Route exact path="/" element={<LandingPage />} />

        <Route exact path="/login" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin} />} />


        <Route exact path="/signup" element={<SignupPage handleSignupOrLogin={handleSignupOrLogin} />} />


        <Route exact path="/search" element={<ShopSearchPage handleSearchSubmit={handleSearchSubmit} shops={shops} />} />

        <Route path="/shopdetails/:id" element={<ShopDetailsPage user={user} handleAddShop={handleAddShop} />} />
        <Route path="/user/:id" element={({ history }) =>
          <>
            <UserPage
              history={history}
              user={user}
            />
          </>
        }></Route>
      </Routes>
    </>
  );
};

export default App;

