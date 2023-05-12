import { gql, useLazyQuery, useQuery } from '@apollo/client'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setAllProducts } from '../features/dataSlice';

const GET_ALL_PRODUCTS = gql`
{
  GetAllProducts {
    id
    name
  }
}
`

const cookie  = new Cookies()
const HomePage = () => {
  const token = cookie.get('token')
  // const allProducts = useSelector((state: RootState) => state.data.allProductsData)
  const [allProductsData, setAllProductsData] = useState<any>({})
  const dispatch = useDispatch()
  // const [ getAllProudctsQuery,{ data, loading, error }] = useLazyQuery(GET_ALL_PRODUCTS, {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);
  useEffect(() => {
     if(data && data.GetAllProducts) {
    dispatch(setAllProducts(data?.GetAllProducts))
    setAllProductsData(data.GetAllProducts)
    // console.log(allProductsData )
    } 
    // dispatch(setAllProducts(data.GetAllProducts))
  }, [data])
  if (loading) {
    return <Loading />
  }

  // if(data) {
  //   dispatch(setAllProducts(data.GetAllProducts))
  // }
  return (

    <>
    <Navbar/>
        <main className='w-full h-[94vh]'>
          <h1>{allProductsData[0]?.id}</h1>
          <div>HomePage</div>
        </main>
    </>
  )
}

export default HomePage
