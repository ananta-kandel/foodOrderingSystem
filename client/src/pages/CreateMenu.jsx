import {React ,useState} from 'react'
import axios from 'axios';
import { globalConstant } from "../constant/constant";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

import {
    Input,
    Button,
    Heading
  } from '@chakra-ui/react';
const CreateMenu = () => {
    const authHeader = useAuthHeader()
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [menuItems, setItems] = useState([]);
    const handleItemNameChange = (event) => {
        setName(event.target.value);
      };
    
      const handleItemPriceChange = (event) => {
        setPrice(event.target.value);
      };
      const handleItemDescriptionChange = (event) => {
        setDescription(event.target.value);
      };

      const addItem = (e) => {
        e.preventDefault()
        if (name && price) {
          const newItem = { name, price: parseFloat(price),description};
          setItems([...menuItems, newItem]);
          setTimeout(() => {
            setName('');
            setPrice('');
          }, 1000);
        }
      };
      const handeleSubmit = async(e)=>{
        
        try{
            console.log("clicked")
            e.preventDefault();
            const headers = { 'Authorization': authHeader};
            await axios.post(`${globalConstant.serverUrl}/api/restaurant/createMenu`, {items:menuItems} , {headers});
            console.log('Restaurant created successfully');
        }
        catch(e){
            console.log("error")
        }
       };
  return (
    <>
    <Heading>Add Menu Items</Heading>
      <form>
      <div>
        <label htmlFor="itemName">Item Name:</label>
        <Input type="text" id="itemName" value={name} onChange={handleItemNameChange} required />
      </div>
      <div>
        <label htmlFor="itemPrice">Item Price:</label>
        <Input type="number" value = {price} id="itemPrice"  onChange={handleItemPriceChange} step="0.01" required />
      </div>
      <div>
        <label htmlFor="itemPrice">Description:</label>
        <Input type="text"  id="itemDescription"  onChange={handleItemDescriptionChange}  required />
      </div>
      <Button  className="mt-2"  onClick={addItem}>Add Item</Button> 
      <h2>Curently Adding dishes:</h2>
      <ul>
        {menuItems.length == 0 ? <h1>Nothing dish in adding process</h1> : (<ul> {menuItems.map((item, index) => (
          <li key={index}> Name : {item.name} - price:  Rs.{item.price} Description- {item.description} </li>
        ))}  </ul> )}
      </ul>
    
      <Button onClick ={handeleSubmit} >Create Menu</Button>
    </form>
    </>
  )
}

export default CreateMenu