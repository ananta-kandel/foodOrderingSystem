import React, { useState } from 'react';
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import { globalConstant } from "../constant/constant";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
const ManageRestaurant = () => {
  const authHeader = useAuthHeader()
  const [restaurantData, setRestaurantData] = useState({});
  const [checkBox, setCheckBox] = useState([]);
  const [file, setFile] = useState();
  
  const handleChange = (e) => {
    setRestaurantData({ ...restaurantData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (value) => {
    setCheckBox((prev) => {
      if (prev.includes(value)) {
        return prev.filter((val) => val !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  for (const key in restaurantData) {
    formData.append(key, restaurantData[key]);
  }
  formData.append('cuisines', checkBox);
  formData.append('file', file);
  try { 
    console.log(formData)
    const headers = { 'Authorization': authHeader};
    const res = await axios.post(`${globalConstant.serverUrl}/api/restaurant/create`, formData, {headers});
    if(res.status == 200){
      toast.success("Restaurant Created sucessfully!");
    }
    else{
      toast.warn("error!");
    }
  } catch (error) {
    console.error('Error creating restaurant:', error);
  }
  };

  return (
    <div className='m-10'>
      <Heading className='text-center'>Create Restaurant</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Restaurant Name:</FormLabel>
          <Input onChange={handleChange} type='string' name="restaurantName" />
          <FormLabel>City</FormLabel>
          <Input onChange={handleChange} type='string' name="city" />
          <FormLabel>Delivery Price</FormLabel>
          <Input onChange={handleChange} type='number' name="deliveryPrice" />
          <FormLabel>Estimated Delivery Time</FormLabel>
          <Input onChange={handleChange} type='number' name="estimatedDeliveryTime" />
          <FormLabel>Description:</FormLabel>
          <Input onChange={handleChange} type='string' name="description" />
          <FormLabel>Select Cuisine</FormLabel>
          <CheckboxGroup name="cuisine" colorScheme='blue'>
            <Stack spacing={[1, 5]} direction={['column', 'row']}>
              <Checkbox onChange={() => handleCheckboxChange('naruto')} value='naruto'>Naruto</Checkbox>
              <Checkbox onChange={() => handleCheckboxChange('sasuke')} value='sasuke'>Sasuke</Checkbox>
              <Checkbox onChange={() => handleCheckboxChange('kakashi')} value='kakashi'>Kakashi</Checkbox>
            </Stack>
          </CheckboxGroup>
          <FormLabel className='text-3xl mt-2'>Choose Restaurant Image</FormLabel>
          <Input className='my-1' type="file" name="image" placeholder='Restaurant Image' onChange={handleFileChange} />
          <div className='flex justify-center mt-2'>
          <Button type="submit" colorScheme='blue'>Submit</Button>
          </div>
        </FormControl>
      </form>
    </div>
  );
};

export default ManageRestaurant;
