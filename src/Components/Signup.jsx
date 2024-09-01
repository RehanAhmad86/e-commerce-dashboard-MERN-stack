import React, { useEffect, useState } from 'react'
import './web.css'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    const navigate = useNavigate()
   //agr user signed in ha to  usy sign in ka page ni dikhana
    useEffect(()=>{
        const auth = localStorage.getItem("users")
        if(auth){
            navigate('/')
        }
    })
    const addData = async () => {
        let result = await fetch("http://localhost:5000/signup", {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
       result = await result.json()
        localStorage.setItem('users',JSON.stringify(result.newUser))
        localStorage.setItem('key',JSON.stringify(result.auth))
        navigate('/')
    }

    return (
        <div className='flex justify-center w-screen h-screen overflow-hidden'>
            <div className='p-10'>
                <div className='flex justify-center bg-sky-300 rounded-md'><span className='text-lg px-4 py-2'>Register</span></div>
                <div className='flex flex-col gap-y-5 mt-5'>
                    <div><input className='w-80 outline-none  px-2 py-1 border-[1px] border-sky-300 rounded-md' value={name} type='text' placeholder='Enter Name' onChange={(event) => { setName(event.target.value) }} /></div>
                    <div><input className='w-80 outline-none  px-2 py-1 border-[1px] border-sky-300 rounded-md' value={email} type='email' placeholder='Enter Email' onChange={(event) => { setEmail(event.target.value) }} /></div>
                    <div><input className='w-80 outline-none  px-2 py-1 border-[1px] border-sky-300 rounded-md' value={password} type='password' placeholder='Enter Password' onChange={(event) => { setPassword(event.target.value) }} /></div>
                </div>
                <div className='flex justify-end mt-5'><button onClick={addData} className='submitbtn text-lg bg-sky-300 px-6 py-2 rounded-md'>Submit</button></div>
            </div>
        </div>
    )
}
export default Signup 