import React, { useState } from 'react';
import axios from 'axios';
import {
  FormControl,
  FormLabel,
  Input,
  CheckboxGroup,
  Stack,
  Checkbox,
  Button,
} from '@chakra-ui/react';
import { globalConstant } from "../constant/constant";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
const ManageRestaurant = () => {
  const authHeader = useAuthHeader()
  const [restaurantData, setRestaurantData] = useState({});
  const [checkBox, setCheckBox] = useState([]);
  const [file, setFile] = useState();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [menuItems, setItems] = useState([]);
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
  

  const handleItemNameChange = (event) => {
    setName(event.target.value);
  };

  const handleItemPriceChange = (event) => {
    setPrice(event.target.value);
  };

  const addItem = () => {
    if (name && price) {
      const newItem = { name, price: parseFloat(price) };
      setItems([...menuItems, newItem]);
      setTimeout(() => {
        setName('');
        setPrice('');
      }, 3000);
      console.log(menuItems)
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

  // Create an array of menu items
  // const menuItems =[ { name: 'anana', price: '100' } ,{ name: 'anana', price: '100' } ];


  // Create FormData object
  const formData = new FormData();

  // Append restaurant data
  for (const key in restaurantData) {
    formData.append(key, restaurantData[key]);
  }
  formData.append('cuisines', JSON.stringify(checkBox));
  // Append image file
  formData.append('file', file);

  // Append menu items
  menuItems.map((value , index) => {
    for( let key in value){
        formData.append(`menuItems[${index}][${key}]`  , value[key])
    }
  } 
  )
  
  try { 
    console.log(formData)
    const headers = { 'Authorization': authHeader};
    await axios.post(`${globalConstant.serverUrl}/api/restaurant/create`, formData, {headers});
    console.log('Restaurant created successfully');
  } catch (error) {
    console.error('Error creating restaurant:', error);
  }
  };

  return (
    <div>
      <h1>Create Restaurant</h1>
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

          <FormLabel>Select Cuisine</FormLabel>
          <CheckboxGroup name="cuisine" colorScheme='blue'>
            <Stack spacing={[1, 5]} direction={['column', 'row']}>
              <Checkbox onChange={() => handleCheckboxChange('naruto')} value='naruto'>Naruto</Checkbox>
              <Checkbox onChange={() => handleCheckboxChange('sasuke')} value='sasuke'>Sasuke</Checkbox>
              <Checkbox onChange={() => handleCheckboxChange('kakashi')} value='kakashi'>Kakashi</Checkbox>
            </Stack>
          </CheckboxGroup>

          <Input type="file" name="image" onChange={handleFileChange} />
          <Button type="submit" colorScheme='blue'>Submit</Button>
        </FormControl>
        {/* for menu items */}

        <h1>Add Menu Items</h1>
      <div>
        <label htmlFor="itemName">Item Name:</label>
        <input type="text" id="itemName" value={name} onChange={handleItemNameChange} required />
      </div>
      <div>
        <label htmlFor="itemPrice">Item Price:</label>
        <input type="number" value = {price} id="itemPrice"  onChange={handleItemPriceChange} step="0.01" required />
      </div>
      <Button type="submit" onClick={addItem}>Add Item</Button> 
      </form>
      <h2>Curently Adding dishes:</h2>
      <ul>
        {menuItems.length == 0 ? <h1>Nothing dish in adding process</h1> : (<ul> {menuItems.map((item, index) => (
          <li key={index}> Name : {item.name} - price:  Rs.{item.price} </li>
        ))}  </ul> )}
      </ul>
    </div>
  );
};

export default ManageRestaurant;
