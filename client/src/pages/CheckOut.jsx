import React from 'react'
import {Checkbox,} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const CheckOut = () => {
  return (
    <>
    <div class="bg-gray-100 dark:bg-white">
    <div class="w-full max-w-3xl mx-auto p-8">
        <div class="bg-white dark:bg-red-200 p-8 rounded-lg shadow-md border dark:border-red-700">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Checkout</h1>

            <div class="mb-6">
                <h2 class="text-xl font-semibold text-gray-700 mb-2">Shipping Address</h2>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="first_name" class="block text-gray-700 e mb-1">First Name</label>
                        <input type="text" id="first_name" class="w-full rounded-lg border py-2 px-3 0 dark:text-white dark:border-none"/>
                    </div>
                    <div>
                        <label class="block text-gray-700mb-1">Last Name</label>
                        <input type="text" id="last_name" class="w-full rounded-lg border py-2 px-3  dark:text-white dark:border-none"/>
                    </div>
                </div>

                <div class="mt-4">
                    <label for="address" class="block text-gray-700 mb-1">Address</label>
                    <input type="text" id="address" class="w-full rounded-lg border py-2 px-3  dark:text-white dark:border-none"/>
                </div>

                <div class="mt-4">
                    <label for="city" class="block text-gray-700 mb-1">City</label>
                    <input type="text" id="city" class="w-full rounded-lg border py-2 px-3  dark:text-white dark:border-none"/>
                </div>

                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label for="state" class="block text-gray-700 mb-1">Provience</label>
                        <input type="text" id="state" class="w-full rounded-lg border py-2 px-3 dark:text-white dark:border-none"/>
                    </div>
                    <div>
                        <label for="zip" class="block text-gray-700 mb-1">ZIP Code</label>
                        <input type="text" id="zip" class="w-full rounded-lg border py-2 px-3  dark:text-white dark:border-none"/>
                    </div>
                </div>
            </div>
            <div>
                <h2 class="text-xl font-semibold text-gray-700 dark:text-red mb-2">Payment Method</h2>
                <div class="mt-4 flex flex-col">
                    <Checkbox className='text-3xl' onChange={() => handleCheckboxChange('Nepali')} value='Nepali'>Cash On Delivery</Checkbox>
                    <Checkbox className='text-3xl' onChange={() => handleCheckboxChange('Nepali')} value='Nepali'>Online Payment</Checkbox>
                </div>
            </div>

            <div class="mt-8 flex justify-end">
                <Link to="/sucess"><button class="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900">Place Order</button></Link>
            </div>
        </div>
    </div>  
    </div>
</>
)
}

export default CheckOut;