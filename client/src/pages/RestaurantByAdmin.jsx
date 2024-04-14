import React, { useEffect, useState } from 'react'
import { globalConstant } from "../constant/constant";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import {
  FormControl,
  FormLabel,
  Input,
  CheckboxGroup,
  Stack,
  Checkbox,
  Button,
  Heading
} from '@chakra-ui/react';
const RestaurantByAdmin = () => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const headers = { 'Authorization': authHeader };
  const [restaurant, setRestaurant] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const handleSubmit= () =>{
    toast.success("Edited Sucessfully")
  }
  useEffect(() => {
    const getRestaurantData = async () => {
      try {
        const response = await axios.get(`${globalConstant.serverUrl}/api/restaurant/getonerestaurant`, { headers });
        if (response.status == 201) {
          toast.warn("No Restaurant found,please create one");
          navigate("/createrestaurant");
        }
        if (response.status == 200) {
          const data = response.data
          setRestaurant(data)
          setIsLoading(false);
        }
        setIsLoading(false)

      }
      catch (e) {
        console.error('Error fetching menu data:', e);
        setIsError(e);
        setIsLoading(false);
      }
    };
    getRestaurantData();
  }, [])
  if (isLoading) {
    <h1>loading......</h1>
  }
  if (isError) {
    <h1>Error : {isError.message}</h1>
  }
  return (
    <div>
      {console.log(restaurant)}
      {restaurant.map((item, index) => (
        <>
          <div class="m-4 sm:px-0 text-white flex justify-between">
            <h3 class="text-3xl font-semibold leading-7 text-center text-red-900">Detail Of Restaurant</h3>
            <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" class="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800" type="button">
              Edit
            </button>
            <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div class="relative p-4 w-full max-w-md max-h-full">

                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                      Edit Your Restaurant Details
                    </h3>
                    <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div class="p-4 md:p-5">
                
    <form class="space-y-4" action="#">
        <FormControl>
          <FormLabel>Restaurant Name:</FormLabel>
          <Input  type='string' name="restaurantName" />
          <FormLabel>City</FormLabel>
          <Input  type='string' name="city" />
          <FormLabel>Delivery Price</FormLabel>
          <Input  type='number' name="deliveryPrice" />
          <FormLabel>Estimated Delivery Time</FormLabel>
          <Input  type='number' name="estimatedDeliveryTime" />
          <FormLabel>Description:</FormLabel>
          <Input  type='string' name="description" />
          <FormLabel>Select Cuisine</FormLabel>
          <CheckboxGroup name="cuisine" colorScheme='blue'>
            <Stack spacing={[1, 5]} direction={['column', 'row']}>
              <Checkbox onChange={() => handleCheckboxChange('naruto')} value='naruto'>Naruto</Checkbox>
              <Checkbox onChange={() => handleCheckboxChange('sasuke')} value='sasuke'>Sasuke</Checkbox>
              <Checkbox onChange={() => handleCheckboxChange('kakashi')} value='kakashi'>Kakashi</Checkbox>
            </Stack>
          </CheckboxGroup>
          <FormLabel className='text-3xl mt-2'>Choose Restaurant Image</FormLabel>
          <Input className='my-1' type="file" name="image" placeholder='Restaurant Image'/>
          <div className='flex justify-center mt-2'>
          <Button onClick={handleSubmit}  colorScheme='blue'>Submit</Button>
          </div>
        </FormControl>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="m-6 border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">Name</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{item.restaurantName}</dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">Location</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item.city}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">Delivery Price</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Rs.{item.deliveryPrice}</dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">Description</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{item.description}</dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">Image</dt>
                <button class="mt-1 text-sm  text-gray-700 sm:col-span-2 sm:mt-0">{item.imageUrl}</button>
              </div>
            </dl>
          </div>
        </>
      ))}
    </div>
  )
}

export default RestaurantByAdmin