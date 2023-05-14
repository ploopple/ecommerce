import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { updateCart } from '../features/dataSlice'
import { GET_PRODUCT_BY_ID } from '../graphql/queries'
import { IProductData, IProductInputData } from '../types'
import { UPDATE_PRODUCT_BY_PRODUCTID } from '../graphql/mutations'
import Cookies from 'universal-cookie'

// const GET_PRODUCT_BY_ID = gql`
// query GetProductById($id: Float!){
//   GetProductById(productId: $id){
//     id
//     name
//     description
//     createdBy
//     price
//     stocks
//     userId
//     stocks
//     image
//     createdAt
//     updatedAt
//   }
// }
// `

const cookie = new Cookies()
const ProductByIdPage = () => {
  const token = cookie.get("token")
  const [updateProductMutation, { data: mutationData, loading: mutationLoading,error:mutationError}] = useMutation(UPDATE_PRODUCT_BY_PRODUCTID, {
context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
  const [updateProductInputData, setUpdateProductInputData] = useState<IProductInputData>({
    name: {value: "", errMsg: ""},
    description: {value: "", errMsg: ""},
    createdBy: {value: "", errMsg: ""},
    image: {value: "", errMsg: ""},
    price: {value: 0, errMsg: ""},
    stocks: {value: 0, errMsg: ""},
  })
  const dispatch = useDispatch()
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<any>({})
  const { productId } = useParams()
  console.log(token)
  const { data, loading, error } = useQuery<{ GetProductById: IProductData }>(GET_PRODUCT_BY_ID, {
    
    variables: {
      id: productId && +productId
    }
  });
  useEffect(() => {
    if (data) {
      setProduct(data.GetProductById)
      setUpdateProductInputData({
        name: {value: data.GetProductById.name, errMsg: ""},
        description: {value: data.GetProductById.description, errMsg: ""},
        createdBy: {value: data.GetProductById.createdBy, errMsg: ""},
        price: {value: data.GetProductById.price, errMsg: ""},
        stocks: {value: data.GetProductById.stocks, errMsg: ""},
        image: {value: data.GetProductById.image, errMsg: ""},
      })
      console.log(updateProductInputData)
    }
  }, [data])
  if (loading || mutationLoading) {
    return <Loading />
  }

  const handleOnAddQuantity = () => {
    if (quantity < product.stocks) {
      setQuantity(quantity + 1)
    }
  }
  const handleOnSubtractQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
 const handleOnInputChange = (input: string, target: string) => {

        let errMsg = ""
        if (target === "stocks" || target === "price") {

        } else {

            errMsg = input.length >= 3 ? "" : target + " must be 3 characters or longer"
        }
        setUpdateProductInputData({
            ...updateProductInputData,
            [target]: {
                value: input,
                errMsg
            }
        })
    }
    const handleOnCloseUpdateProduct = () => {
      setUpdateProductInputData({
        name: {value: product.name, errMsg: ""},
        description: {value: product.description, errMsg: ""},
        createdBy: {value: product.createdBy, errMsg: ""},
        price: {value: product.price, errMsg: ""},
        stocks: {value: product.stocks, errMsg: ""},
        image: {value: product.image, errMsg: ""},
      })
      setIsUpdatingProduct(false)
    }
const isDissableUpdateProductBtn: boolean =
        updateProductInputData.name.value.toString().length < 3 ||
        updateProductInputData.description.value.toString().length < 3 ||
        updateProductInputData.createdBy.value.toString().length < 3 ||
        updateProductInputData.image.value.toString().length < 3
    const handleOnUpdateProduct = () => {
      updateProductMutation({
        variables: {
          id: Number(productId),
          req: {
            name: updateProductInputData.name.value,
            description: updateProductInputData.description.value,
            createdBy: updateProductInputData.createdBy.value,
            image: updateProductInputData.image.value,
            price: Number(updateProductInputData.price.value),
            stocks: Number(updateProductInputData.stocks.value)
          }
        },
update: (cache, data) => {
                    console.log(cache, data)
                    // const prod: any = cache.readQuery({ query: GET_PRODUCT_BY_ID })
                    cache.writeQuery({
                        query: GET_PRODUCT_BY_ID,
                        data: { GetProductById: [data.data.UpdateProductById] }
                    })
                }
        // refetchQueries: [{query: GET_PRODUCT_BY_ID}]
      })
      setIsUpdatingProduct(false)

    }
  return (
    <>
      <Navbar />
      {isUpdatingProduct ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  overflow-auto">
          <div className="w-2/5 max-h-[98%] overflow-auto bg-white rounded-xl flex flex-col p-4">
            <div>
              <button onClick={handleOnCloseUpdateProduct} className='float-right text-red-500'>X</button>
            </div>
            <label htmlFor="">Name</label>
            <input type="text" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e.target.value, "name")} value={updateProductInputData.name.value} />
            <label htmlFor="">Description</label>
            <input type="text" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e.target.value, "description")} value={updateProductInputData.description.value} />
            <label htmlFor="">Created By</label>
            <input type="text" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e.target.value, "createdBy")} value={updateProductInputData.createdBy.value} />
            <label htmlFor="">Stocks</label>
            <input type="number" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e.target.value, "stocks")} value={updateProductInputData.stocks.value} />
            <label htmlFor="">Price</label>
            <input type="number" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e.target.value, "price")} value={updateProductInputData.price.value} />
            <label htmlFor="">Image</label>
            <input type="text" className='bg-gray-200 rounded-lg h-8 p-2 my-2' onChange={e => handleOnInputChange(e.target.value, "image")} value={updateProductInputData.image.value} />
            <button disabled={isDissableUpdateProductBtn} onClick={handleOnUpdateProduct} className={`${isDissableUpdateProductBtn ? "bg-red-300" : "bg-red-600"}  text-white py-2 rounded-xl mt-2`}>Add new Product</button>
          </div>
        </div>
      ) : null}
      <main className="bg-gray-100 h-[94vh]">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full">
              <img
                src={product.image}
                alt="Product Image"
                className="w-500 rounded-lg m-auto"
              />
              <button onClick={() => setIsUpdatingProduct(true)}>Update</button>
            </div>
            <div className="w-full">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-gray-800 font-bold mb-4">${product.price}</p>
              <div className="mb-4">
                <label className="text-gray-600">Quantity</label>
                <div className="flex items-center mt-1">
                  <button
                    className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full focus:outline-none"
onClick={handleOnSubtractQuantity}
                  >
                    -
                  </button>
                  <p>{quantity}</p>
                  <button
                    className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full focus:outline-none"
                    onClick={handleOnAddQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"

               onClick={() => dispatch(updateCart({product, quantity}))}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ProductByIdPage