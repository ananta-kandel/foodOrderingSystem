import React from 'react'
import { Sparkle } from 'lucide-react';
import {useDispatch} from "react-redux"
import { addToCart } from '../redux/slices/CartSlice';
const FoodCard = ({id,name, price, desc, image, rating}) => {

  const dispatch = useDispatch();

  return (
    <div className='m-2 font-bold w-[250px] p-5 bg-gray-100 flex flex-col gap-4 rounded-lg'>
        <img src={image} alt="food_image" className='overflow-hidden w-auto h-[130px] hover:scale-110 cursor-grab transition-all duration-500'></img>
        <div className='text-sm flex justify-between '>
            <h2>{name}</h2>
            <span className='text-red-500'>रु॰ {price}</span>
        </div>
        <p className='text-sm font-normal '>{desc.slice(0,50)}...</p>
        <div className='flex justify-between'>
            <span className='flex justify-center items-center '>
            <Sparkle className="mr-1" color="#ecc536"/> {rating}
            </span>
            <button onClick={()=>{
              dispatch(addToCart({id , name , price , rating ,image , qty:1 }))
            }} className='p-1 text-black bg-red-200 hover:text-white hover:bg-red-500 text-sm rounded-lg'>Add to cart</button>
        </div>
    </div>
  )
}

export default FoodCard