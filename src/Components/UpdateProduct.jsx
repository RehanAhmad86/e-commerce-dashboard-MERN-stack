import React, { useEffect, useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom'

const Updateproduct = () => {
    let [ name , setName ] = useState('')
    let [ price , setPrice ] = useState('')
    let [ category , setCategory ] = useState('')
    let [ company , setCompany ] = useState('')
    let params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getData()
    },[])

    const getData = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}` , 
            {
                headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('key'))}` 
                }   
        }
        )
        result = await result.json()
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    let updateData = async () => {
        let result = await fetch(`http://localhost:5000/update/${params.id}` , {
            method:"PUT",
            body:JSON.stringify({name , price , category , company}),
            headers:{
                "Content-Type":"Application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('key'))}`  
            }
        })
        result = await result.json()
            navigate('/')
    }




    return(
        <div className='flex justify-center w-screen h-screen overflow-hidden mb-5'>
        <div className='p-10'>
            <div className='flex justify-center bg-sky-300 rounded-md'><span className='text-lg px-4 py-2'>Update product</span></div>
            <div className='flex flex-col gap-y-5 mt-5'>
            <div className='flex flex-col'>
            <div><input className='w-80 outline-none  px-2 py-1 border-[1px] border-sky-300 rounded-md' type='text' placeholder='Enter Name'
            value={name} onChange={(event)=>setName(event.target.value)}/>
            
            </div></div>
            <div className=''>
            <div><input className='w-80 outline-none  px-2 py-1 border-[1px] border-sky-300 rounded-md' type='text' placeholder='Enter Price'
            value={price} onChange={(event)=>setPrice(event.target.value)}/>
            </div>
            </div>
            <div>
            <div><input className='w-80 outline-none  px-2 py-1 border-[1px] border-sky-300 rounded-md' type='text' placeholder='Enter Category'
            value={category} onChange={(event)=>setCategory(event.target.value)}/>
            </div>
            </div>
            <div>
            <div><input className='w-80 outline-none  px-2 py-1 border-[1px] border-sky-300 rounded-md' type='text' placeholder='Enter Company'
            value={company} onChange={(event)=>setCompany(event.target.value)}/>
            
             </div>
             </div>
           
            </div>
            <div className='flex justify-end mt-5'><button onClick={updateData} className='submitbtn text-lg bg-sky-300 px-6 py-2 rounded-md '>Update product</button></div>
        </div>
      </div>
    )
}
export default Updateproduct