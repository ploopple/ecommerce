import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { updateCart } from '../features/dataSlice'

const GET_PRODUCT_BY_ID = gql`
query GetProductById($id: Float!){
  GetProductById(productId: $id){
    id
    name
    description
    createdBy
    price
    stocks
    userId
    stocks
    image
    createdAt
    updatedAt
  }
}
`

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
  return (
    <>
      <Navbar />
      <main className='flex p-8'>
        <img height={"50%"} className='border  rounded-xl bg-red-300' src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.qcReVnSVjwqWYRhMuEiuqwHaHa%26pid%3DApi&f=1&ipt=648a966b913977453c901fac4464dbd74745755bd70cbc3ef83b3b586e1c3110&ipo=images" alt="" />
        <div className='ml-8 mt-8'>
          <h1 className='font-bold'>{product.name}</h1>
          <h1 className='my-4'>By {product.createdBy}</h1>
          <h2 className='my-4 font-extrabold'>${product.price} or ${product.price / 12}/month</h2>
          <p className='my-4'>Description: </p>
          <p >{product.description}</p>
          <div className=' w-full mt-8 flex'>
            <button className='bg-gray-200 rounded-s-2xl w-14 h-10' onClick={handleOnSubtractQuantity}>-</button>
            <p className='bg-gray-200 pt-2'>{quantity}</p>
            <button className='bg-gray-200 rounded-e-2xl w-14 h-10' onClick={handleOnAddQuantity}>+</button>
            <p className='ml-12 mt-3 text-sm'>only {product.stocks} items left! Don't miss it</p>
          </div>
          <div className='mt-8 flex'>
            <button className=' w-[49%] bg-green-700 text-white py-2 rounded-xl hover:bg-green-900'>Buy now</button>
            <button 
              onClick={() => dispatch(updateCart({product, quantity}))}
              className='ml-2 w-[49%] text-green-700 bg-gray-200 py-2 rounded-xl hover:bg-gray-300'>Add to cart</button>
          </div>
        </div>
      </main>
    </>
  )
}

export default ProductByIdPage