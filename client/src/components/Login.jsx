import React from "react"
import axios from 'axios'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import {globalConstant} from "../constant/constant"
import { Link,useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const signIn = useSignIn()
    const [formData, setFormData] = React.useState({username: '', password: ''})
    const onSubmit = async(e) => {
        e.preventDefault()
        const res = await axios.post(`${globalConstant.serverUrl}/api/user/login`, formData)
              console.log(res)
                const token = res.data.access_token.split(" ")[1];
                if(res.status === 200){
                    if(signIn({
                        auth: {
                            token: token,
                            type: 'Bearer'
                        },
                    })){ // Only if you are using refreshToken feature
                        // Redirect or do-something
                    }else {
                        //Throw error
                    }
                }
        navigate("/")
    }

    return (
        <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="" alt="logo"/>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
      
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
              <div className="mt-2">
                <input onChange={(e)=>setFormData({...formData, username: e.target.value})}  type="text" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>
      
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-red-600 hover:text-red-500">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
                <input onChange={(e)=>setFormData({...formData, password: e.target.value})} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
              <div className="text-sm">
                  <Link to ="/register"  className="pt-[20px] font-semibold text-red-600 hover:text-indigo-500">Donot have Account?</Link>
                </div>
            </div>
      
            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>
        </div>
      </div>
      
     </>
    )
}
export default Login;