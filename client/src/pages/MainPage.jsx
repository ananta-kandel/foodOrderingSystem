import React,{useEffect,useState} from 'react'
import "../css/mainpage.css"
import { Input,Button } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter,Stack,Heading,Text,Divider,Image} from '@chakra-ui/react'
import { ArrowForwardIcon} from '@chakra-ui/icons'
import { PhoneOutgoing,MailPlus } from 'lucide-react';
import restaurant from "../assests/restaurant.jpeg"
import logo from "../assests/logo.png"
import { Link } from 'react-router-dom'

//authentication frontend part
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import axios from 'axios'
import {globalConstant} from "../constant/constant"
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie';
const MainPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  //hookes for authentication
  const isAuthenticated = useIsAuthenticated()
  const signOut = useSignOut()
  //for cookies data
  const [userLocation, setUserLocation] = useState(null);
  const [name, setName] = useState(null);
   useEffect(() => {
    const name = Cookies.get('_auth');
    console.log(name)
    if (name) {
      const decoded = jwtDecode(name);
      setName(decoded.username);
    } else {
      setName("User")
    }
  }, []);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          error => {
            console.error('Error getting user location:', error);
            setError(error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setError('Geolocation is not supported by this browser.');
      }
    };
    const getData = async () => {
      try {
        const response = await axios.get(`${globalConstant.serverUrl}/api/restaurant/getallrestaurant`);
        const data = response.data
        setRestaurants(data)
        console.log(restaurant)
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching  data:', error);
        setError(error);
        setIsLoading(false);
      }
    };
    getUserLocation();
    getData(); // Call the async function inside useEffect
  }, []);
// algorithm
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
     Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};
const getNearbyRestaurants = () => {
  if (!userLocation) return [];

  return restaurants
.map(restaurant => {
       const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        restaurant.latitude,
        restaurant.longitude
      );
      return { ...restaurant };
    })
    .sort((a, b) => a.distance - b.distance);
  
};

const nearbyRestaurants = getNearbyRestaurants();
  
  const handleSearch = () => {
    // Filter restaurants based on search query
    // Assuming you want to search by restaurant name
    const filteredRestaurants = restaurants.filter(restaurant =>
      restaurant.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredRestaurants;
  };
  
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    console.log(searchQuery)
  };

// useEffect(()=>{console.log(restaurant)},[restaurant])
  return (
    <>
    <div className=''>
         <nav className='flex items-center justify-between  h-[13vh]  bg-white'>
          <div className='h-[10vh]'>
            <img className='h-[10vh] mx-5' src={logo} alt="logo"></img>
         </div>
        {isAuthenticated ? 
        <div className='flex justify-between gap-20'>
          <div className='pr-[100px]'>
          <Link to="/createrestaurant"><p className='text-3xl text-center text-red-500'>Welcome {name} </p></Link>
          </div>
         <div>
         <Button onClick={()=>signOut()} className="m-2" colorScheme='red'>Sign out</Button>
         </div>
         </div> : (
          <div className='flex'>
                <Link to="/login"><Button className="m-2" colorScheme='red'>Login</Button></Link>
                <Link to="/register"><Button className="m-2" colorScheme='red'>Register</Button></Link>
          </div>    
)}
      </nav>
         <div className="header flex text-red-400  flex-col items-center justify-center">
            <p className='text-9xl m-3'>Abit Eat</p>
            <h1 className='text-white text-3xl'>Order Food From Your Favourite Restaurant </h1>
         </div>
    </div>

    <div>
      <h1 className='text-3xl text-red-400 m-5'>Discover Restaurant</h1>
      <div className='flex justify-center'>
      <Input onChange={handleInputChange} className="mt-5" placeholder='Search Restaurant'  htmlSize={40} width='auto'/>
      <Button onClick={handleSearch} className="mt-5" colorScheme='red'>search</Button>
      </div>
      <div className='m-5 grid grid-cols-3'>
    {handleSearch().map((items ,index) => (
       <Card maxW='sm' className='m-2'  key={index}>
       <CardBody>
         <Image
           src={items.imageUrl}
           alt='Green double couch with wooden legs'
           borderRadius='lg'
         />
         <Stack mt='6' spacing='3'>
           <Heading size='md'>{items.restaurantName}</Heading>
           <Text>
             {items.description}
           </Text>
           <div className='flex'>
            
           {items.cuisines.map((cusine , index) => (
                <Text color='blue.600' fontSize='2xl'>
                  {cusine}, 
                </Text>
              ))
             }
           </div>
         </Stack>
       </CardBody>
       <Divider />
       <CardFooter>
           <Link to ={`/restaurant/${items._id}`}><Button variant='solid' colorScheme='red'>
             Order Now <ArrowForwardIcon className='m-2'/>
           </Button></Link>
       </CardFooter>
     </Card>
    ))  
    }
  </div>
</div>


{/* //for nearby restaurant  */}


<div>
      <h1 className='text-3xl text-red-400 m-5'>NearBy Restaurant</h1>
      <div className='m-5 grid grid-cols-3'>
    {nearbyRestaurants.map((items ,index) => (
       <Card maxW='sm' className='m-2'  key={index}>
       <CardBody>
         <Image
           src={items.imageUrl}
           alt='Green double couch with wooden legs'
           borderRadius='lg'
         />
         <Stack mt='6' spacing='3'>
           <Heading size='md'>{items.restaurantName}</Heading>
           <Text>
             {items.description}
           </Text>
           <div className='flex'>
            
           {items.cuisines.map((cusine , index) => (
                <Text color='blue.600' fontSize='2xl'>
                  {cusine}, 
                </Text>
              ))
             }
           </div>
         </Stack>
       </CardBody>
       <Divider />
       <CardFooter>
           <Link to ={`/restaurant/${items._id}`}><Button variant='solid' colorScheme='red'>
             Order Now <ArrowForwardIcon className='m-2'/>
           </Button></Link>
       </CardFooter>
     </Card>
    ))  
    }
  </div>
</div>

  {/* //footer */}
    <div id="footer" className="grid md:grid-cols-2 grid-cols-1 py-[4rem] text-black ">
      <div className='mx-2 border-red-500 md:border-r-2  text-center'>
        <p className='text-[1.5rem] font-bold'>Abit Eat</p>
        <p className='text-[1.5rem] '>Kathmandu,Nepal</p>
      </div>
       <div>
        <div className='flex justify-center mt-[0.5rem]'>
        <PhoneOutgoing  />
        <a  className="pl-1" href="tel:+977 9860459806">+977 9860459806</a>
        </div>
        <div className='flex justify-center mt-[0.5rem]'>
        <MailPlus  />
        <a  className="pl-1" href="mailto:kandelananta12@gmail.com">contacts@12@abiteat.com</a>
        </div>
       </div>
    </div>

</>
)
}

export default MainPage
