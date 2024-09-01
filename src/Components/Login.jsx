import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    let [ email , setEmail] = useState('')
    let [ password , setPassword] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
      const auth = localStorage.getItem('users')
      if(auth){
        navigate('/')
      }
    } , [navigate])


    const handleLoginApi = async () => {
        console.warn(email , password)
        let result = await fetch("http://localhost:5000/login" , {
            method: "POST",
            body: JSON.stringify({email , password}),
            headers:{
               "Content-Type":"Application/json"
            }
        })
        result = await result.json()
        if(result.auth){
            localStorage.setItem("users" , JSON.stringify(result.user))
            localStorage.setItem("key" , JSON.stringify(result.auth))
            navigate('/')
        }
        else{
            alert("Enter correct name!")
        }
    }
   
    return(
      <div className='flex justify-center w-screen h-screen overflow-hidden'>
        <div className='p-10'>
            <div className='flex justify-center bg-sky-300 rounded-md'><span className='text-lg px-4 py-2'>Login</span></div>
            <div className='flex flex-col gap-y-5 mt-5'>
            <div><input className='w-80 outline-none  px-2 py-1 border-[1px] border-sky-300 rounded-md' type='email' placeholder='Enter Email'
            value={email} onChange={(event)=>setEmail(event.target.value)}/></div>
            <div><input className='w-80 outline-none  px-2 py-1 border-[1px] border-sky-300 rounded-md' type='password' placeholder='Enter Password'
            value={password} onChange={(event)=>setPassword(event.target.value)}/></div>
            </div>
            <div className='flex justify-end mt-5'><button onClick={handleLoginApi} className='submitbtn text-lg bg-sky-300 px-6 py-2 rounded-md '>Login</button></div>
        </div>
      </div>
    )
}

export default Login



