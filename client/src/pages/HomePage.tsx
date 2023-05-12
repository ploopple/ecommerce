import { gql, useQuery } from '@apollo/client'
import Navbar from '../components/Navbar'
import { useEffect } from 'react';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setAllProducts } from '../features/dataSlice';
import { Link } from 'react-router-dom';

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
          <Link to={'product/'+product.id} key={product.id} className='cursor-pointer outline outline-[0.1px] outline-gray-200 rounded-xl w-max h-max my-6 ml-6 flex flex-col hover:outline-4'>
            <img width={175} className='rounded-xl' src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.qcReVnSVjwqWYRhMuEiuqwHaHa%26pid%3DApi&f=1&ipt=648a966b913977453c901fac4464dbd74745755bd70cbc3ef83b3b586e1c3110&ipo=images" alt="" />
            {/* <img className='' src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thescottishsun.co.uk%2Fwp-content%2Fuploads%2Fsites%2F2%2F2021%2F04%2FNINTCHDBPICT000630452860-1.jpg%3Fw%3D1980&f=1&nofb=1&ipt=8f5ccb603d324a1d8660d1fae2c00db051deacba14d285e4a1eb70ccc43d56a6&ipo=images" alt="" /> */}
            <div className='p-2 w-full '>
              <h1 className='mx-2'>{product.name +product.id}</h1>
              <div className='flex w-full justify-around my-2'>
              <p className='bg-yellow-400 text-white rounded-md px-1'>*5</p>
              <button className=' bg-orange-500 text-white rounded-md px-2 hover:bg-orange-400'>Add to cart</button>
              </div>
            </div>
          </Link>
        ))}
        </div>
      </main>
    </>
  )
}

export default HomePage
