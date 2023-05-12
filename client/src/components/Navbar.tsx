import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Loading from './Loading'
// const GET_USER_INFO = gql`
//  {
//    GetUserInfo {
//     id
//     username
//     email
//     createdAt
//     createdAt
//     updatedAt
//   }
// }`

const cookie = new Cookies
const Navbar = () => {
    const token = cookie.get("token")
    // const { data, loading, error } = useQuery(GET_USER_INFO, {
    //     context: {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     },
    //     fetchPolicy: "no-cache"
    // });
    const handleOnLogOut = () => {
        cookie.remove("token")
        window.location.href = "/"

    }
    // if (loading) {
    //     return <Loading />
    // }
    return (
        <div className='flex justify-between w-full h-[6vh] items-center border-b-2'>
            <h1 className='ml-8'>
                <Link to={"/"}>Logo</Link>
            </h1>
            <ul className='flex'>

                {/* {!loading && data && data.GetUserInfo ? ( */}
                {token ? (
                    <>
                        <li className='mx-20'>
                            <Link to={"/cart"}>Cart</Link>
                        </li>
                        <li className='mx-20' onClick={handleOnLogOut}>Logout</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to={"/login"}>Login</Link>
                        </li>
                        <li className='mx-1 2'>
                            <Link to={"/signUp"}>SignUp</Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default Navbar