import React  from "react";
import {
    BrowserRouter,
    Link,
    Route,
    Routes,
  } from "react-router-dom";
//for protected Routes
import RequireAuth from '@auth-kit/react-router/RequireAuth'
//import 
import Home from "../components/Home";
import Login from "../components/Login";
import MainPage from "../pages/MainPage";
import Register from "../components/Register";
import ManageRestaurant from "../pages/ManageRestaurant";
import ShowYourMenu from "../pages/ShowYourMenu";
import EachResturant from "../pages/EachResturant";
import CreateMenu from "../pages/CreateMenu"
import ErrorPage from "../pages/ErrorPage";
import Map from "../components/Map";
import Admin from "../pages/Admin";
import RestaurantByAdmin from "../pages/RestaurantByAdmin";
import CheckOut from "../pages/CheckOut";
import Sucess from "../components/Sucess"
const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      
      <Route path="/menu" element={<ShowYourMenu/>}/>
      <Route path="/restaurant/:id" element={<EachResturant/>}/>
      

      {/* //Admin */}
      <Route path="/admin" element={<Admin/>}/>
      <Route path={'/createrestaurant'} element={
          <RequireAuth fallbackPath={'/login'}>
            <ManageRestaurant/>
          </RequireAuth>
        }
      />
      <Route path="/createmenu" element={<CreateMenu/>}/>
      <Route path="/viewmenu" element={<ShowYourMenu/>}/>
      <Route path="/viewrestaurant" element={<RestaurantByAdmin/>}/>
      <Route path="/checkout" element={<CheckOut/>}/>
      <Route path="/map" element={<Map/>}/>
      <Route path="/sucess" element={<Sucess/>}/>
      <Route path="/*" element={<ErrorPage/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default AppRoutes