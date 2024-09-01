import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addproduct = () => {
    let [ name , setName ] = useState()
    let [ price , setPrice ] = useState()
    let [ category , setCategory ] = useState()
    let [ company , setCompany ] = useState()
    let [ errorMessage , setErrorMessage ] = useState(false)
    let navigate = useNavigate()

    const handleProduct = async () => {
        if(!name || !price || !category || !company){
            setErrorMessage(true)
            return false
        }
        let userId = JSON.parse(localStorage.getItem('users'))._id
        let result = await fetch('http://localhost:5000/add-product' , {
            method: "POST",
            body: JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-Type":"Application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('key'))}` 
            }
        })
        result = await result.json()
        if(result){
            localStorage.setItem("products" , JSON.stringify(result))
            console.log(localStorage.getItem('key'));
            navigate('/')
        }
    }

    return(
        <div className='flex justify-center w-screen h-screen overflow-hidden mb-5'>
        <div className='p-10'>
            <div className='flex justify-center bg-sky-300 rounded-md'><span className='text-lg px-4 py-2'>Add products</span></div>
            <div className='flex flex-col gap-y-5 mt-5'>
            <div className='flex flex-col'>
            <div><input className='w-80 outline-none  px-2 py-1 border-[1px] border-sky-300 rounded-md' type='text' placeholder='Enter Name'
            value={name} onChange={(event)=>setName(event.target.value)}/>
            {errorMessage && !name && <div><p>Enter your name</p></div>}
            </div></div>
            <div className=''>
            <div><input className='w-80 outline-none  px-2 py-1 border-[1px] border-sky-300 rounded-md' type='text' placeholder='Enter Price'
            value={price} onChange={(event)=>setPrice(event.target.value)}/>
            {errorMessage && !price && <div><p>Enter your price</p></div>}</div>
            </div>
            <div>
            <div><input className='w-80 outline-none  px-2 py-1 border-[1px] border-sky-300 rounded-md' type='text' placeholder='Enter Category'
            value={category} onChange={(event)=>setCategory(event.target.value)}/>
            {errorMessage && !category && <div><p>Enter your category</p></div>}</div>
            </div>
            <div>
            <div><input className='w-80 outline-none  px-2 py-1 border-[1px] border-sky-300 rounded-md' type='text' placeholder='Enter Company'
            value={company} onChange={(event)=>setCompany(event.target.value)}/>
             {errorMessage && !company && <div><p>Enter your company</p></div>}
             </div>
             </div>
           
            </div>
            <div className='flex justify-end mt-5'><button onClick={handleProduct} className='submitbtn text-lg bg-sky-300 px-6 py-2 rounded-md '>Add product</button></div>
        </div>
      </div>
    )
}
export default Addproduct