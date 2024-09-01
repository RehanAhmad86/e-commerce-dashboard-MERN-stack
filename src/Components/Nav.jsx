import React from 'react'
import './web.css'
import { Link, useNavigate } from 'react-router-dom'
import productImage from './images/vecteezy_3d-rendering-shopping-bag-icon-with-percent-sign-shopping_41503445.png'
const Nav = () => {
    const auth = localStorage.getItem('users')
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <>
             {auth ?

                <div className='flex justify-between items-center font-serif bg-sky-300 h-16 px-5'>
                    <div className=''><img className='w-16 h-16 logoimage' src={productImage} /></div>
                    <div>
                        <ul className='flex gap-x-5 items-center'>
                            <li><Link to="/">Products</Link></li>
                            <li><Link to="/add">Add products</Link></li>
                            <li><Link to="/update">Update Products</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                        </ul>
                    </div>
                    <div><ul><li><Link onClick={logOut} to="/logout">Logout ({JSON.parse(auth).name})</Link></li></ul></div>
                </div>
                :
                <div className='flex justify-between items-center font-serif bg-sky-300 h-16 px-5'>

                    <div className=''><img className='w-16 h-16 logoimage' src={productImage} /></div>

                    <div>
                        <ul className='flex gap-x-5 items-center'>
                            <li><Link to="/signup">Signup</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </div>
                </div>}
        </>

    )
}
export default Nav