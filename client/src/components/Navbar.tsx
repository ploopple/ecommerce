import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Loading from './Loading'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { IInputData } from '../types'
import { addToNewProduct } from '../features/dataSlice'
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

const ADD_NEW_PRODUCT = gql`

mutation CreateNewProduct($req: ProductInput!) {
    CreateNewProduct(req: $req) {
        id
        name
        description
        price
        stocks
        userId
        image
        createdBy
        createdAt
        updatedAt
    }
  }
`

const cookie = new Cookies
const Navbar = () => {
    const [newProductInputData, setNewProductInputData] = useState<IInputData>({
        name: {value: "", errMsg: ""},
        description: {value: "", errMsg: ""},
        price: {value: 0, errMsg: ""},
        stocks: {value: 0, errMsg: ""},
        createdBy: {value: "", errMsg: ""},
        image: {value: "", errMsg: ""},
    })
    const [isAddingNewProduct, setIsAddingNewProduct] = useState(false)
    const productCart = useSelector((state: RootState) => state.data.cart)
    const dispatch = useDispatch()
    const token = cookie.get("token")
    const [addNewProductMutation, { data, loading, error }] = useMutation(ADD_NEW_PRODUCT, {
        context: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        // fetchPolicy: "no-cache"
    });
    useEffect(() => {
if(data) {

        dispatch(addToNewProduct(data.CreateNewProduct))
        }
    }, [data])
    const handleOnLogOut = () => {
        cookie.remove("token")
        window.location.href = "/"

    }
    const handleOnInputChange = (e: any, target: string) => {

        let errMsg = ""
        // if (target === "username") {
            if(target === "stocks" || target === "price") {

            }else {

          errMsg = e.target.value.length >= 3 ? "" : target + " must be 3 characters or longer"
            }
        // } else if (target === "email") {
        //   errMsg = e.target.value.length >= 8 ? "" : target + " must be 8 characters or longer"
        //   if (!errMsg) {
        //     errMsg = isValidEmail(e.target.value) ? "" : target + " must be email"
        //   }
        // } else if (target === "password") {
        //   errMsg = e.target.value.length >= 8 ? "" : target + " must be 8 characters or longer"
        // }
        setNewProductInputData({
          ...newProductInputData,
          [target]: {
            value: e.target.value,
            errMsg
          }
        })
      }
    const handleOnAddNewProduct = async() => {

        await addNewProductMutation({
            variables: {
                req: {
                    name: newProductInputData.name.value,
                    description: newProductInputData.description.value,
                    price: +newProductInputData.price.value,
                    stocks: +newProductInputData.stocks.value,
                    createdBy: newProductInputData.createdBy.value,
                    image: newProductInputData.image.value
                }
            }
        })
        
        setIsAddingNewProduct(false)
    }
    if (loading) {
        return <Loading />
    }

    // console.log(data)
    return (
        <div className='flex justify-between w-full h-[6vh] items-center border-b-2'>
            {isAddingNewProduct ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  overflow-auto">
                    <div className="w-2/5 max-h-[98%] overflow-auto bg-white rounded-xl flex flex-col p-4">
                        <div>
                            <button onClick={() => setIsAddingNewProduct(false)} className='float-right text-red-500'>X</button>
                        </div>
                        <label htmlFor="">Name</label>
                        <input type="text" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e, "name")} value={newProductInputData.name.value} />
                        <p className="text-red-400 text-sm">{newProductInputData.name.errMsg}</p>
                        <label htmlFor="">description</label>
                        <input type="text" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e, "description")} value={newProductInputData.description.value} />
                        <p className="text-red-400 text-sm">{newProductInputData.description.errMsg}</p>
                        <label htmlFor="">price</label>
                        <input type="number" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e, "price")} value={newProductInputData.price.value} />
                        <p className="text-red-400 text-sm">{newProductInputData.price.errMsg}</p>
                        <label htmlFor="">stocks</label>
                        <input type="number" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e, "stocks")} value={newProductInputData.stocks.value} />
                        <p className="text-red-400 text-sm">{newProductInputData.stocks.errMsg}</p>
                        <label htmlFor="">created By</label>
                        <input type="text" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e, "createdBy")} value={newProductInputData.createdBy.value} />
                        <p className="text-red-400 text-sm">{newProductInputData.createdBy.errMsg}</p>
                        <label htmlFor="">image</label>
                        <input type="text" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e, "image")} value={newProductInputData.image.value} />
                        <p className="text-red-400 text-sm">{newProductInputData.image.errMsg}</p>
                        <button onClick={handleOnAddNewProduct} className='bg-red-600 text-white py-2 rounded-xl mt-2'>Add new Product</button>
                    </div>
                </div>


            ) : null}
            <h1 className='ml-8'>
                <Link to={"/"}>Logo</Link>
            </h1>
            <ul className='flex'>

                {/* {!loading && data && data.GetUserInfo ? ( */}
                {token ? (
                    <>
                        <li className='mx-5 cursor-pointer' onClick={() => setIsAddingNewProduct(true)}>add product</li>
                        <li className='mx-5'>
                            <Link to={"/cart"}>Cart {productCart.length ? productCart.length : ""}</Link>
                        </li>
                        <li className='mx-5 cursor-pointer' onClick={handleOnLogOut}>Logout</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to={"/login"}>Login</Link>
                        </li>
                        <li className='mx-10'>
                            <Link to={"/signUp"}>SignUp</Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default Navbar