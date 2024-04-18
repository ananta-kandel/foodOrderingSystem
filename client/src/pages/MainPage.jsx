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
const MainPage = () => {
  const [restaurant, setRestaurant] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //hookes for authentication
  const isAuthenticated = useIsAuthenticated()
  const signOut = useSignOut()
  console.log(isAuthenticated)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${globalConstant.serverUrl}/api/restaurant/getallrestaurant`);
        const data = response.data
        console.log(data)
        setRestaurant(data)
        console.log(restaurant)
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching  data:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    getData(); // Call the async function inside useEffect
  }, []);

  

  const data = [{
    "name":"Three leaf Nepali Indian Cusine",
    "location":"kathmandu",
    "description":"Hello we are best restaurant in town which provides you best ambients",
    "cusines" : ["indian" , "Rusian" ,"Nepali"]
  },
  {
    "name":"Three leaf Nepali Indian Cusine",
    "location":"kathmandu",
    "description":"Hello we are best restaurant in town which provides you best ambients",
    "cusines" : ["indian" , "Rusian" ,"Nepali"]
  },
  {
    "name":"Three leaf Nepali Indian Cusine",
    "location":"kathmandu",
    "description":"Hello we are best restaurant in town which provides you best ambients",
    "cusines" : ["indian" , "Rusian" ,"Nepali"]
  },
  {
    "name":"Three leaf Nepali Indian Cusine",
    "location":"kathmandu",
    "description":"Hello we are best restaurant in town which provides you best ambients",
    "cusines" : ["indian" , "Rusian" ,"Nepali"]
  }
]

useEffect(()=>{console.log(restaurant)},[restaurant])
  return (

    <>
    <div className=''>
         <nav className='flex items-center  justify-between h-[13vh]  bg-white'>
          <div className='h-[10vh]'>
            <img className='h-[10vh] mx-5' src={logo} alt="logo"></img>
         </div>
         <div className='flex'>
         <Link to="/createrestaurant"><p className='text-3xl text-red-500'>Add Restaurant?</p></Link>
         </div>
        <div>
        {isAuthenticated ? <div>
          <h1>Name of user</h1>
         <Button onClick={()=>signOut()} className="m-2" colorScheme='red'>Sign out</Button>
          </div> : (
          <div className='flex'>
                <Link to="/login"><Button className="m-2" colorScheme='red'>Login</Button></Link>
                <Link to="/register"><Button className="m-2" colorScheme='red'>Register</Button></Link>
          </div>    
)}
      </div>
      </nav>
         <div className="header flex text-red-400  flex-col items-center justify-center">
            <p className='text-9xl m-3'>Abit Eat</p>
            <h1 className='text-white text-3xl'>Order Food From Your Favourite Restaurant </h1>
         </div>
    </div>
    <div>
      <h1 className='text-3xl text-red-400 m-5'>Discover Restaurant</h1>
      <div className='flex justify-center'>
      <Input className="mt-5" placeholder='Search Restaurant'  htmlSize={40} width='auto'/>
      <Button className="mt-5" colorScheme='red'>search</Button>
      </div>
      <div className='m-5 grid grid-cols-3'>
    {restaurant && restaurant.length>0 && restaurant.map((items ,index) => (
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
</div>
</>
)
}

export default MainPage
