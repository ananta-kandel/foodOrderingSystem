import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { globalConstant } from "../constant/constant";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { MdOutlineModeEditOutline,MdDeleteForever } from "react-icons/md";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from '@chakra-ui/react'

const ShowYourMenu = () => {
  const authHeader = useAuthHeader();
  const headers = { 'Authorization': authHeader };
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMenuData = async () => {
      try {
        const response = await axios.get(`${globalConstant.serverUrl}/api/restaurant/getmenu`, { headers });
        // setMenuItems(response.data.Items);
       const item = response.data[0].items;
       setMenuItems(item);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching menu data:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    getMenuData(); // Call the async function inside useEffect
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className='text-center m-[2rem]'>Your Menu</h1>
      <TableContainer>
  <Table  className="w-[100%]" variant='striped' colorScheme='red'>
    <TableCaption>Latest Menu</TableCaption>
    <Thead>
      <Tr>
        <Th>Dish Name</Th>
        <Th>Price</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
    <Tbody>

      {menuItems.length ==0 ? <h1>No Any data</h1> : menuItems.map((menuItem, index) => (
        <Tr key={index}>
        <>
        <Td className='m-2'>{menuItem.name}</Td>
        <Td className='m-2'>{menuItem.price}</Td>
        <Td className='m-2'><Button className='m-2'> <MdOutlineModeEditOutline></MdOutlineModeEditOutline>Edit</Button><Button> <MdDeleteForever></MdDeleteForever>Delete</Button></Td>
        </>
        </Tr>
      ))}
     </Tbody>
  </Table>
</TableContainer>
    </div>
  );
};

export default ShowYourMenu;

