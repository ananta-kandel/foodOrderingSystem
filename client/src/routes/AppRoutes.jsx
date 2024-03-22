import React  from "react";
import {
    BrowserRouter,
    Link,
    Route,
    Routes,
  } from "react-router-dom";

//import 
import Home from "../components/Home";
import Login from "../components/Login";
import MainPage from "../pages/MainPage";
import Register from "../components/Register";
import ManageRestaurant from "../pages/ManageRestaurant";
import ShowYourMenu from "../pages/ShowYourMenu";

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/createrestaurant" element={<ManageRestaurant/>}/>
      <Route path="/menu" element={<ShowYourMenu/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default AppRoutes