import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex justify-between w-full h-[6vh] items-center border-b-2'>
            <h1 className='ml-8'>
                <Link to={""}>Logo</Link>
            </h1>
            <ul className='flex'>
                <li>
                    <Link to={"signUp"}>SignUp</Link>
                </li>
                <li className='mx-20'>
                    <Link to={"cart"}>Cart</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar