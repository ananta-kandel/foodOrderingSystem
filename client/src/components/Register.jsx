import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import {globalConstant} from "../constant/constant"
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const signIn = useSignIn()
    const navigate = useNavigate();
    const [formData , setformData] = useState("");
    const change = (e) => {
        e.preventDefault();
        setformData({ ...formData, [e.target.name]: e.target.value });
      };
      const onSubmit = async(e) => {
        e.preventDefault()
        const res = await axios.post(`${globalConstant.serverUrl}/api/user/register`, formData)
        console.log(res);
           try{
            if(res.status === 200){
                if(signIn({
                    auth: {
                        token: res.data.access_token,
                        type: 'Bearer'
                    },
                }))
                toast.success("Register Sucessfully")
                setTimeout(() => {
                    navigate("/home")
                }, 10000); 
            }
            else{
            if(res.status === 403){
                console.log(res)
                toast.success("Register Sucessfully")
            }
           }
        }
           catch{
            toast.warn("user Registration failed")
           }     
           
    }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up in to your account</h2>
    </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Username:</label>
        <div className="mt-2">
          <input onChange={change} id="email" name="username" type="text" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
        <div className="mt-2">
          <input onChange={change} id="email" name="email" type="text" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div className="mt-2">
          <input onChange={change} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button  type="submit" className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">Register</button>
      </div>
    </form>
    <ToastContainer />
  </div>
</div>
)
}
export default Register
