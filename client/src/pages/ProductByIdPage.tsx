import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { updateCart } from '../features/dataSlice'
import { GET_PRODUCT_BY_ID } from '../graphql/queries'

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

const ProductByIdPage = () => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<any>({})
  const { productId } = useParams()
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      id: productId && +productId
    }
  });
  useEffect(() => {
    if (!loading) {
      setProduct(data.GetProductById)
    }
  }, [data])
  if (loading) {
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
  // return (
  //   <>
  //     <Navbar />
  //     <main className='flex p-8'>
  //       <img width={500} height={500} className='border  rounded-xl bg-red-300' src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.qcReVnSVjwqWYRhMuEiuqwHaHa%26pid%3DApi&f=1&ipt=648a966b913977453c901fac4464dbd74745755bd70cbc3ef83b3b586e1c3110&ipo=images" alt="" />
  //       <div className='ml-8 mt-8'>
  //         <h1 className='font-bold'>{product.name}</h1>
  //         <h1 className='my-4'>By {product.createdBy}</h1>
  //         <h2 className='my-4 font-extrabold'>${product.price} or ${product.price / 12}/month</h2>
  //         <p className='my-4'>Description: </p>
  //         <p >{product.description}</p>
  //         <div className=' w-full mt-8 flex'>
  //           <button className='bg-gray-200 rounded-s-2xl w-14 h-10' onClick={handleOnSubtractQuantity}>-</button>
  //           <p className='bg-gray-200 pt-2'>{quantity}</p>
  //           <button className='bg-gray-200 rounded-e-2xl w-14 h-10' onClick={handleOnAddQuantity}>+</button>
  //           <p className='ml-12 mt-3 text-sm'>only {product.stocks} items left! Don't miss it</p>
  //         </div>
  //         <div className='mt-8 flex'>
  //           <button className=' w-[49%] bg-green-700 text-white py-2 rounded-xl hover:bg-green-900'>Buy now</button>
  //           <button 
  //             onClick={() => dispatch(updateCart({product, quantity}))}
  //             className='ml-2 w-[49%] text-green-700 bg-gray-200 py-2 rounded-xl hover:bg-gray-300'>Add to cart</button>
  //         </div>
  //       </div>
  //     </main>
  //   </>
  // )


  return (
    <>
      <Navbar />
      <main className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.qcReVnSVjwqWYRhMuEiuqwHaHa%26pid%3DApi&f=1&ipt=648a966b913977453c901fac4464dbd74745755bd70cbc3ef83b3b586e1c3110&ipo=images"
                alt="Product Image"
                className="w-full rounded-lg"
              />
            </div>
            <div className="w-full">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-gray-800 font-bold mb-4">${product.price}</p>
              {/* <div className="mb-4">
                <label className="text-gray-600">Size</label>
                <select
                  name="size"
                  id="size"
                  className="block w-full mt-1 py-2 px-3 border border-gray-400 bg-white rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-500"
                >
                  <option value="s">Small</option>
                  <option value="m">Medium</option>
                  <option value="l">Large</option>
                </select>
              </div> */}
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
                  {/* <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="w-12 border border-gray-400 rounded-lg py-1 px-2 text-center mx-2"
                    value="1"
                  /> */}
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