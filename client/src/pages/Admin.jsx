import React,{useState,useEffect} from 'react'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { globalConstant } from "../constant/constant";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie';
import  axios  from 'axios';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import {toast } from 'react-toastify';
const Admin = () => {
const authHeader = useAuthHeader()
const handleClick =async() =>{
  try{
    toast.warn("hello")
    console.log("clicked")
    const headers = { 'Authorization': authHeader};
    console.log(headers)
    const res = await axios.post(`${globalConstant.serverUrl}/api/restaurant/addmenu` ,{"name":"hello"}, {headers});
    console.log(res.status)
    console.log('Restaurant created successfully');
  }
  catch(e){
    //  toast.warn(e)
  }
}
const signOut = useSignOut()
const [role, setRole] = useState(null);
useEffect(() => {
    const name = Cookies.get('_auth');
    console.log(name)
    if (name) {
      const decoded = jwtDecode(name);
      setRole(decoded.role);
    } else {
      setRole("USER")
    }
  }, []);
  return (
    <>
    {
       role == "ADMIN" ? (
        <>
        <nav className="bg-red-800 p-4 text-white">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <Button onClick={()=>signOut()} className="m-2" colorScheme='red'>Sign out</Button>
        </div>
      </nav>
    <div className="flex">
    {/* Side Panel */}
    <div className="w-1/4 bg-gray-200 h-screen p-4">
      <ul>
        <li>
          <Link to="/createrestaurant" className="text-blue-500 hover:text-blue-700">Create Restaurant</Link>
        </li>
        <li>
          <Link to="/createmenu" className="text-blue-500 hover:text-blue-700">Create Menu</Link>
        </li>
        <li>
          <Link to="/viewmenu" className="text-blue-500 hover:text-blue-700">View Menu</Link>
        </li>
        <li>
          <Link to="/viewrestaurant/" className="text-blue-500 hover:text-blue-700">View Restaurants</Link>
        </li>
      </ul>
    </div>
    {/* Main Content */}
    <div className="w-3/4 p-4">
      <Button className='text-red-400 text-center text-3xl cursor' onClick={handleClick}> click here to add Menu to your Restaurant</Button>
    </div>
  </div>
  </>
    ):
    (
        <>
        {/* {alert("You Are not loged as admin")} */}
        <nav className="bg-red-800 p-4 text-white">
        <div className='flex'>
                <Link to="/login"><Button className="m-2" colorScheme='red'>Login</Button></Link>
                <Link to="/register"><Button className="m-2" colorScheme='red'>Register</Button></Link>
          </div>  
        </nav>
        </>
    )
    }
     
  </>
  )
}

export default Admin;