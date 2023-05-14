import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../app/store"
import { addToCart, subtractFromCart } from "../features/dataSlice"
import { useEffect, useState } from "react"

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.data.cart)
  const dispatch = useDispatch()
  const [totoal, setTotal] = useState(0)
  useEffect(() => {
    setTotal(0)
    let t = 0
    for (let i = 0; i < cartItems.length; i++) {
      t += cartItems[i].quantity * cartItems[i].product.price
    }
    setTotal(t)
  }, [cartItems])

  return (
    <>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="md:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <table className="w-full">
              <thead
                className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
              >
                <tr>
                  <th className="py-3 px-6 text-left">Product</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Quantity</th>
                  <th className="py-3 px-6 text-left">Subtotal</th>
                  <th className="py-3 px-6 text-left"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {cartItems.map(p => (
                  <tr key={p.product.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <img
                          alt="Product image"
                          src={p.product.image}
                          className="w-20 mr-2 rounded-lg bg-emerald-200"
                        />
                        <div>
                          <p className="font-medium">{p.product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">{p.product.price}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <button
                          className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full focus:outline-none"
                          onClick={() => dispatch(subtractFromCart(p.product.id))}
                        >
                          -
                        </button>
                        <p>{p.quantity}</p>
                        <button
                          className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full focus:outline-none"
                          onClick={() => dispatch(addToCart(p.product.id))}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">${p.product.price * p.quantity}</td>
                    <td className="py-4 px-6">
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="md:col-span-1 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-4">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-gray-800">${totoal}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-gray-600">Shipping</p>
                <p className="text-gray-800">$5.00</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-gray-600">Tax</p>
                <p className="text-gray-800">$4.50</p>
              </div>
              <div className="flex justify-between mb-4 font-bold">
                <p className="text-gray-600">Total</p>
                <p className="text-gray-800">${totoal + 5 + 4.50}</p>
              </div>
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
        ): (<h1>You cart is empty</h1>)}
      </div>
    </>
  )
}

export default CartPage