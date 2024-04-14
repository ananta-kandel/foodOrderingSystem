import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { globalConstant } from "../constant/constant";
import { Input,Button } from '@chakra-ui/react'
import { MapPin,PhoneOutgoing } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import FoodData from './FoodData';
import FoodCart from '../components/FoodCart';
import CategoryMenu from '../components/CategoryMenu';
import { useParams } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';



const test =()=>{
  console.log(":")
}
const EachResturant = () => {
  const authHeader = useAuthHeader();
  const headers = { 'Authorization': authHeader };
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`${globalConstant.serverUrl}/api/restaurant/getonerestaurant/${id}`, { headers });
        const data = response.data.restaurant
        setRestaurant(data)
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!restaurant) {
    return <div>No restaurant found</div>;
  }
  
  return (
    <>
      <nav className='flex items-center  justify-between h-[13vh]  bg-white'>
          <div className='h-[10vh] flex items-center'>
            <div className='m-2 text-xl font-bold text-red-500'>
            {new Date().toUTCString().slice(0,16)}
            </div>
            
         </div>
         <div className='flex'>
         <p className='text-3xl text-red-500'>Restaurant Name</p>
         </div>
        <div className='flex'>
        <Input className='mr-[10px]' type='search' name="search" id="" placeholder='search for food' onChange={test}></Input>
        <Button className="mr-4" colorScheme='red'>Get location</Button>
        </div>
      </nav>

      <div className="header flex text-white justify-center flex-col pl-10 ">
            <p className='text-5xl font-bold'>Restaurant Name</p>
            <div className='flex my-2 text-3xl'>
                <p className='flex items-center'><MapPin />Sifal,kathmandu 44600</p>
                <p className='flex ml-2 items-center'><PhoneOutgoing />+977 014286944</p>
            </div>
            <div className='bg-white p-2 max-w-[30vw] rounded-lg'>
                 <p className='text-black text-2xl'>Delivery Time : 30 minutes</p>
            </div>
     </div>
     <p className='text-center my-5 text-3xl text-red-500'>order Your Favourite Dish</p>

<CategoryMenu/>

{/* //food-items */}
<div className='flex flex-wrap'>
  {
    FoodData.map((food)=>{
      return <FoodCard id={food.id} name={food.name} price={food.price} desc={food.desc} ratting={food.rating} image={food.img} />
    })
  }
</div>

{/* //foodcartitems */}
<FoodCart/>


{/* //footer */}

     <div>
        <p className='text-center my-5'>copyRight@2024 Restaurant Name</p>
     </div>
    </>
  )
}

export default EachResturant