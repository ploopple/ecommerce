import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Loading from './Loading'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { IInputData } from '../types'
import { ADD_NEW_PRODUCT } from '../graphql/mutations'
import { GET_ALL_PRODUCTS } from '../graphql/queries'

// const GET_ALL_PRODUCTS = gql`
// {
//   GetAllProducts {
//     id
//     name
//     description
//     price
//     stocks
//     userId
//     image
//     createdBy
//     updatedAt
//     createdAt
//    __typename
//   }
// }
// `
// const ADD_NEW_PRODUCT = gql`
// mutation CreateNewProduct($req: ProductInput!) {
//     CreateNewProduct(req: $req) {
//         id
//         name
//         description
//         price
//         stocks
//         userId
//         image
//         createdBy
//         createdAt
//         updatedAt
//    __typename
//     }
//   }
// `

const cookie = new Cookies
const Navbar = () => {
    // const queryClient = useQueryClient();

    const [newProductInputData, setNewProductInputData] = useState<IInputData>({
        name: { value: "", errMsg: "" },
        description: { value: "", errMsg: "" },
        price: { value: 0, errMsg: "" },
        stocks: { value: 0, errMsg: "" },
        createdBy: { value: "", errMsg: "" },
        image: { value: "", errMsg: "" },
    })
    const [isAddingNewProduct, setIsAddingNewProduct] = useState(false)
    const productCart = useSelector((state: RootState) => state.data.cart)
    const dispatch = useDispatch()
    const token = cookie.get("token")
    const [addNewProductMutation, { loading, error }] = useMutation(ADD_NEW_PRODUCT, {
        context: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        // onCompleted: (data) => {
        //     console.log(data)
        // }
        // update: (cache, {data: {addNewProduct}}) =>     {
        //     const data: any = cache.readQuery({query: GET_ALL_PRODUCTS})
        //     // const products = cache.
        //     console.log(addNewProduct)
        //     // cache.writeQuery({
        //     //     query: GET_ALL_PRODUCTS, 
        //     //     data: { GetAllProducts: [...data.GetAllProducts, newProduct] },
        //     //     })
        //     //     data: { GetAllProducts: [...data.GetAllProducts, newProduct] },
        //     // cache.writeQuery({
        //     //     query: GET_ALL_PRODUCTS,
        //     //     data: { GetAllProducts: [...data.GetAllProducts, newProduct] },
        //     // })

        // }
    });
    const handleOnLogOut = () => {
        cookie.remove("token")
        window.location.href = "/"

    }
    const handleOnInputChange = (input: string, target: string) => {

        let errMsg = ""
        if (target === "stocks" || target === "price") {

        } else {

            errMsg = input.length >= 3 ? "" : target + " must be 3 characters or longer"
        }
        setNewProductInputData({
            ...newProductInputData,
            [target]: {
                value: input,
                errMsg
            }
        })
    }
    const handleOnAddNewProduct = async () => {
        console.log(123)
        // handleOnInputChange(newProductInputData.image.value+"","image")
        // handleOnInputChange(newProductInputData.createdBy.value+"","createdBy")
        // handleOnInputChange(newProductInputData.description.value+"","description")
        // handleOnInputChange(newProductInputData.name.value+"","name")
        if (
            newProductInputData.name.value &&
            newProductInputData.description.value &&
            newProductInputData.createdBy.value &&
            newProductInputData.image.value
        ) {

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
                },
                update: (cache, data) => {
                    console.log(cache, data)
                    const products: any = cache.readQuery({ query: GET_ALL_PRODUCTS })
                    cache.writeQuery({
                        query: GET_ALL_PRODUCTS,
                        data: { GetAllProducts: [...products.GetAllProducts, data.data.CreateNewProduct] }
                    })
                },
                // refetchQueries: [{query: GET_ALL_PRODUCTS}]
            })

            setIsAddingNewProduct(false)
            const temp = newProductInputData
            temp.name.value = ""
            temp.name.errMsg = ""
            temp.description.value = ""
            temp.description.errMsg = ""
            temp.image.value = ""
            temp.image.errMsg = ""
            temp.price.value = 0
            temp.price.errMsg = ""
            temp.stocks.value = 0
            temp.stocks.errMsg = ""
            temp.createdBy.value = ""
            temp.createdBy.errMsg = ""
            setNewProductInputData(temp)
        }
    }
    const handleOnCloseAddNewProduct = () => {
        setIsAddingNewProduct(false)
        const temp = newProductInputData
        temp.name.value = ""
        temp.name.errMsg = ""
        temp.description.value = ""
        temp.description.errMsg = ""
        temp.image.value = ""
        temp.image.errMsg = ""
        temp.price.value = 0
        temp.price.errMsg = ""
        temp.stocks.value = 0
        temp.stocks.errMsg = ""
        temp.createdBy.value = ""
        temp.createdBy.errMsg = ""
        setNewProductInputData(temp)
    }
    if (loading) {
        return <Loading />
    }

    // console.log(data)
    const isDissableAddNewProductBtn: boolean =
        newProductInputData.name.value.toString().length < 3 ||
        newProductInputData.description.value.toString().length < 3 ||
        newProductInputData.createdBy.value.toString().length < 3 ||
        newProductInputData.image.value.toString().length < 3
    return (
        <div className='flex justify-between w-full h-[6vh] items-center border-b-2'>
            {isAddingNewProduct ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  overflow-auto">
                    <div className="w-2/5 max-h-[98%] overflow-auto bg-white rounded-xl flex flex-col p-4">
                        <div>
                            <button onClick={handleOnCloseAddNewProduct} className='float-right text-red-500'>X</button>
                        </div>
                        <label htmlFor="">Name</label>
                        <input type="text" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e.target.value, "name")} value={newProductInputData.name.value} />
                        <p className="text-red-400 text-sm">{newProductInputData.name.errMsg}</p>
                        <label htmlFor="">description</label>
                        <input type="text" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e.target.value, "description")} value={newProductInputData.description.value} />
                        <p className="text-red-400 text-sm">{newProductInputData.description.errMsg}</p>
                        <label htmlFor="">price</label>
                        <input type="number" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e.target.value, "price")} value={newProductInputData.price.value} />
                        <p className="text-red-400 text-sm">{newProductInputData.price.errMsg}</p>
                        <label htmlFor="">stocks</label>
                        <input type="number" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e.target.value, "stocks")} value={newProductInputData.stocks.value} />
                        <p className="text-red-400 text-sm">{newProductInputData.stocks.errMsg}</p>
                        <label htmlFor="">created By</label>
                        <input type="text" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e.target.value, "createdBy")} value={newProductInputData.createdBy.value} />
                        <p className="text-red-400 text-sm">{newProductInputData.createdBy.errMsg}</p>
                        <label htmlFor="">image</label>
                        <input type="text" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e.target.value, "image")} value={newProductInputData.image.value} />
                        <p className="text-red-400 text-sm">{newProductInputData.image.errMsg}</p>
                        <button disabled={isDissableAddNewProductBtn} onClick={handleOnAddNewProduct} className={`${isDissableAddNewProductBtn ? "bg-red-300" : "bg-red-600"}  text-white py-2 rounded-xl mt-2`}>Add new Product</button>
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