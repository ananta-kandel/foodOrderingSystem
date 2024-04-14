import React from 'react'
import { Plus, Minus,Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { decrementQty, incrementQty, removeFromCart } from '../redux/slices/CartSlice';
const FoodItems = ({id,name, qty , price,image}) => {
   const dispatch = useDispatch(); 
    return (
        <>
           <div className='flex gap-2 shadow-md rounded-lg p-2 mb-3'>
           <Trash2 onClick={() =>dispatch(removeFromCart({id,image,name,price,qty}))}  className="text-red-500 rounded-lg absolute right-7 cursor-pointer hover:translate-y-0.5 transition-all ease-linear duration-75"/>
            <img src= {image} alt="food image" className='w-[50px] h-[50px]'></img>
            <div className=''>
                <h2 className='font-bold  '>{name}</h2>
                <div className='flex justify-between items-center w-full mt-1'>
                    <span className='text-red-500 font-bold'>रु॰ {price}</span>
                    <div className='flex justify-center items-cente gap-2 absolute right-7'>
                        <Plus onClick={()=> dispatch(incrementQty({id}))} className='border-2 text-xl transition-all ease-linear cursor-pointer rounded-md border-gray-600 text-red-500 hover:text-white hover:bg-red-500 hover:border-none' />
                        <span>{qty}</span>
                        <Minus onClick={()=> qty > 1 ? dispatch(decrementQty({id})) :  1 } className='border-2 text-xl transition-all ease-linear cursor-pointerrounded-md border-gray-600 text-red-500 hover:text-white hover:bg-red-500 hover:border-none' />
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default FoodItems