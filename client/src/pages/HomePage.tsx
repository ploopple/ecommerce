import { gql, useQuery } from '@apollo/client'
import Navbar from '../components/Navbar'
import { useEffect } from 'react';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Link } from 'react-router-dom';
import { setAllProducts, updateCart } from '../features/dataSlice';

const GET_ALL_PRODUCTS = gql`
{
  GetAllProducts {
    id
    name
    description
    price
    stocks
    userId
    image
    createdBy
    updatedAt
    createdAt
  }
}
`

const HomePage = () => {
  const allProducts = useSelector((state: RootState) => state.data.allProductsData)
  const dispatch = useDispatch()
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);
  useEffect(() => {
    if (data && data.GetAllProducts) {
      dispatch(setAllProducts(data?.GetAllProducts))
      // dispatch((data?.GetAllProducts))
    }
  }, [data])
  if (loading) {
    return <Loading />
  }
console.log(allProducts)
  return (
    <>
      <Navbar />
      <main className='w-full h-[94vh]'>
        <div className='w-full h-full flex'>
         {allProducts.map((product: any) => ( 
          <div  key={product.id} className='cursor-pointer outline outline-[0.1px] outline-gray-200 rounded-xl w-max h-max my-6 ml-6 flex flex-col hover:outline-4'>
            <Link to={'product/'+product.id}>

            <img width={175} className='rounded-xl' src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.qcReVnSVjwqWYRhMuEiuqwHaHa%26pid%3DApi&f=1&ipt=648a966b913977453c901fac4464dbd74745755bd70cbc3ef83b3b586e1c3110&ipo=images" alt="" />
            </Link>
            <div className='p-2 w-full '>
              <h1 className='mx-2'>{product.name +product.id}</h1>
              <div className='flex w-full justify-around my-2'>
              <p className='bg-yellow-400 text-white rounded-md px-1'>*5</p>
              <button onClick={() => dispatch(updateCart({product,quantity: 1}))} className=' bg-orange-500 text-white rounded-md px-2 hover:bg-orange-400'>Add to cart</button>
              </div>
            </div>
          </div>
        ))}
        </div>
      </main>
    </>
  )
}

export default HomePage
