import React, { useEffect, useState } from 'react'
import FoodData from '../pages/FoodData';
import { Key } from 'lucide-react';
import {  useDispatch } from 'react-redux';
import { setCategory } from '../redux/slices/CategorySlice';
const CategoryMenu = () => {
    const [categories , setcategories] = useState([]);

    const listUqiueCategory =()=>{
        const uniqueCategory = [...new Set(FoodData.map((food)=> food.category))];
        setcategories(uniqueCategory)
        console.log(categories)
    }
    useEffect(()=>{
        listUqiueCategory();
    },[])

    const dispatch = useDispatch();

  return (

    <div>
    <h3 className='text-xl font-semibold m-4'> Find the best food</h3>
   <div className='mx-5 flex gap-3'>
    <button className='px-3 py-2 text-center bg-red-200 font-bold rounded-lg hover:bg-red-500 hover:text-white'>All</button>
    {
        categories.map((categories,index)=>{

            return (
                <button  onClick={()=> dispatch(setCategory(categories))}  Key = {index}  className='px-3 py-2 text-center bg-red-200 font-bold rounded-lg hover:bg-red-500 hover:text-white'>{categories}</button>
            )
        })
    }
   </div> 
   </div>
  )
}

export default CategoryMenu