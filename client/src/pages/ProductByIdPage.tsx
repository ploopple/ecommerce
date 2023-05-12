import React from 'react'
import { useParams } from 'react-router-dom'

const ProductByIdPage = () => {
    const {productId} = useParams()
  return (
    <div>ProductById {productId}</div>
  )
}

export default ProductByIdPage