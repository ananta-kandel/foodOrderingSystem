import React, { useState } from 'react';
import axios from 'axios';
import { globalConstant } from "../constant/constant";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

import {
    Input,
    Button,
    Heading,
    FormLabel
} from '@chakra-ui/react';

const CreateMenu = () => {
    const authHeader = useAuthHeader();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [file, setFile] = useState();

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
        e.preventDefault();
        if (name && price) {
            const newItem = { name, price: parseFloat(price), description };
            setMenuItems([...menuItems, newItem]);
            setName('');
            setPrice('');
            setDescription('');
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append('file', file);
            formData.append('items', JSON.stringify(menuItems));

            const headers = { 'Authorization': authHeader };
            await axios.post(`${globalConstant.serverUrl}/api/restaurant/createMenu`, formData, { headers });
            console.log('Menu created successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Heading>Add Menu Items</Heading>
            <form encType='multipart/formdata'>
                <div>
                    <label htmlFor="itemName">Item Name:</label>
                    <Input type="text" id="itemName" value={name} onChange={handleItemNameChange} required />
                </div>
                <div>
                    <label htmlFor="itemPrice">Item Price:</label>
                    <Input type="number" value={price} id="itemPrice" onChange={handleItemPriceChange} step="0.01" required />
                </div>
                <div>
                    <label htmlFor="itemPrice">Description:</label>
                    <Input type="text" id="itemDescription" onChange={handleItemDescriptionChange} value={description} required />
                </div>
                <FormLabel className='text-3xl mt-2'>Choose Restaurant Image</FormLabel>
                <Input className='my-1' type="file" name="image" placeholder='Restaurant Image' onChange={handleFileChange} />
                <Button className="mt-2" onClick={addItem}>Add Item</Button>
                <h2>Currently Adding dishes:</h2>
                <ul>
                    {menuItems.length === 0 ? <h1>Nothing dish in adding process</h1> : (
                        <ul>
                            {menuItems.map((item, index) => (
                                <li key={index}> Name : {item.name} - price:  Rs.{item.price} Description- {item.description} </li>
                            ))}
                        </ul>
                    )}
                </ul>

                <Button onClick={handleSubmit} >Create Menu</Button>
            </form>
        </>
    );
}

export default CreateMenu;
