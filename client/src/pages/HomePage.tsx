import { useQuery } from '@apollo/client'
import { useEffect } from 'react';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Link } from 'react-router-dom';
import { setAllProducts, updateCart } from '../features/dataSlice';
import { GET_ALL_PRODUCTS } from '../graphql/queries';

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

  return (
    <>
        {!allProducts.length ? (
          <div className='text-center'>
            <h1 className='p-8 text-xl'>There are now products. go and create a new one</h1>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {allProducts.map(product => (

                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link to={"/product/" + product.id} className="block">
                    <img
                      src={product.image}
                      alt="Product Image"
                      className="w-full"
                    />
                  </Link>
                  <div className="p-4">
                    <Link
                      to={"/product/" + product.id}
                      className="text-xl font-bold text-gray-800 hover:text-red-500 mb-2 block"
                    >{product.name}</Link>
                    <p className="text-gray-800 font-bold">${product.price}</p>
                    <button
                      className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
                      onClick={() => dispatch(updateCart({ product, quantity: 1 }))}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  )
}

export default HomePage
