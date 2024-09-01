import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ProductList = () => {

    let [products, setProducts] = useState([])

    useEffect(() => {
        productList()
    }, [])

    const productList = async () => {
        let result = await fetch('http://localhost:5000/product', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('key'))}`
            }
        })
        result = await result.json()
        setProducts(result)
    }

    const searchProduct = async (event) => {
        let key = event.target.value
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,
                {
                    headers: {
                        authorization: `bearer ${JSON.parse(localStorage.getItem('key'))}`
                    }
                })
            result = await result.json()
            if (result) {
                setProducts(result)
            }
        }
        else {
            productList()
        }
    }

    const productDelete = async (id) => {
        await fetch(`http://localhost:5000/delete/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('key'))}`
            }

        })
        productList()
    }



    return (

<div className='flex flex-col w-screen h-screen mt-5'>
    <div className='flex justify-center mt-5'>
        <input
            className='w-80 outline-none px-2 py-1 border-[1px] border-sky-300 rounded-md'
            type='text'
            placeholder='Search Product'
            onChange={searchProduct}
        />
    </div>
    <div className='w-[65vw] mx-auto mt-10 mb-20 h-auto overflow-auto flex-1'>
        {products.length > 0 ? (
            products.map((product, index) => (
                <ul
                    key={product._id}
                    className='flex justify-around items-center border-[1px] border-sky-300 my-2'
                >
                    <li className='text-center p-5 w-[5vw]'>{index + 1}</li>
                    <li className='text-center p-5 w-[20vw] flex-shrink'>{product.name}</li>
                    <li className='text-center p-5 w-[10vw]'>{product.price}</li>
                    <li className='text-center p-5 w-[15vw]'>{product.category}</li>
                    <li className='text-center p-5 w-[15vw]'>{product.company}</li>
                    <li className='text-center p-5 w-[10vw]'>
                        <button onClick={() => { productDelete(product._id) }}>Delete</button>
                    </li>
                    <Link to={"/update/" + product._id} className='p-5 w-[10vw] text-center'>
                        Update
                    </Link>
                </ul>
            ))
        ) : (
            <div className='flex justify-center items-center mt-20'>
                <h1 className='text-2xl font-semibold'>No Product Found!</h1>
            </div>
        )}
    </div>
    <footer className='w-full h-16 bg-gray-200 flex-shrink-0'>
        <p className='text-center py-4'>Footer Content Here</p>
    </footer>
</div>


    )
}
export default ProductList