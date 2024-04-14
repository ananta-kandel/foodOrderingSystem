import React ,{useState} from 'react'
import { X, ShoppingCart } from 'lucide-react';
import FoodItems from './FoodItems';
import {  useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
const FoodCart = () => {
  const [activeCart , setActiveCart] = useState(true);
  const cartItems = useSelector((state)=>state.cart.cart);
  const totalQty = cartItems.reduce((totalQty , item)=>
          totalQty + item.qty , 0
  )
  const totalPrice = cartItems.reduce((totalPrice , item)=>
     totalPrice + item.qty * item.price , 0)
  console.log(cartItems)
  return (
    <>
    <div className={`top-0 w-[20vw] p-5 bg-gray-100 h-[100vh] ${activeCart  ? "fixed right-0" : " absolute right-[-400px]"} transition-all duration-500 z-50`}>
        <div className='flex justify-between items-center my-3'>
            <span className='text-xl font-bold text-gray-800'>My Order</span>
            <X  onClick ={()=> setActiveCart(!activeCart) }className='border-2 border-gray-600 text-gray font-bold p-1 text-xl rounded-md hover:text-red-300 hover:red-300 cursor-pointer'/>
        </div>
        {cartItems.length === 0 ? (
     <h1 className='font-bold text-center'>No Any food items on Cart
     </h1>
    ) : (
    cartItems.map((items) => {
    return (
      <FoodItems
        key={items.id}
        id={items.id}
        name={items.name}
        price={items.price}
        image={items.image}
        qty={items.qty}
      />
    );
  })
)}
        <div className='absolute bottom-0'>
        <h3 className='font-semibold '>Items: {totalQty} </h3>
        <h3 className='font-semibold '>Total Amount : {totalPrice} </h3>
        <hr className='w-[90vw] my-2' />
        <button className='bg-red-500 font-bold px-3 text-white py-2 rounded-lg w-[18vw] mb-5'>Place Order</button>
         </div>
    </div>
    <ShoppingCart size={60} onClick={()=>{setActiveCart(!activeCart)}} className={`text-red-500 fixed shadow-md text-5xl bottom-3 right-10 pointer-cursor hover:translate-x-1 ${totalQty >0 &&  "animate-bounce delay-500 transition-all"}` }/>
    </>
  )
}

export default FoodCart