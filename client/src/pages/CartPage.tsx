import { useDispatch, useSelector } from "react-redux"
import Navbar from "../components/Navbar"
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
  // return (
  //   <>
  //     <Navbar />
  //     <main className='w-full h-[94vh] flex flex-wrap justify-center p-4'>
  //       {!cartItems.length ? (
  //         <h1>You don't have any items to view</h1>
  //       ) : (
  //         <div className="pt-8 w-[700px]">
  //           <h1 className="my-6">you have {cartItems.length} item{cartItems.length > 1 ? "s" : ""}</h1>
  //           <table className="border">
  //             <thead>
  //               <tr className="border">
  //                 <th className="border w-[15%]">image</th>
  //                 <th className="border w-[15%]">name</th>
  //                 <th className="border w-[15%]">quantity</th>
  //                 <th className="border w-[15%]">price</th>
  //               </tr>
  //             </thead>
  //             <tbody>

  //               {cartItems.map(p => (
  //                 <tr key={p.product.id} className="text-center border">
  //                   <td className="">
  //                     <img width={100} className='' src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.qcReVnSVjwqWYRhMuEiuqwHaHa%26pid%3DApi&f=1&ipt=648a966b913977453c901fac4464dbd74745755bd70cbc3ef83b3b586e1c3110&ipo=images" alt="" />
  //                   </td>
  //                   <td className="border">{p.product.name}</td>
  //                   <td className=" flex justify-center mt-8">
  //                     <button className='bg-gray-200 rounded-s-2xl w-14 h-10' onClick={() => dispatch(subtractFromCart(p.product.id))}>-</button>
  //                     <p className='bg-gray-200 pt-2'>{p.quantity}</p>
  //                     <button className='bg-gray-200 rounded-e-2xl w-14 h-10' onClick={() => dispatch(addToCart(p.product.id))}>+</button>
  //                   </td>
  //                   <td className="border">${p.product.price * p.quantity}</td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       )}
  //       {!cartItems.length ? (
  //         <></>
  //       ) : (
  //         <div className=" flex flex-col  items-center mt-[50px] ml-8 ">
  //           <h1 className="bg-gray-200 p-2 rounded-lg">Your total is  ${totoal}</h1>
  //           <br />
  //           <button className="text-white bg-green-600 rounded-lg px-4 py-1 text-xl">Buy Now</button>
  //         </div>
  //       )}

  //     </main>
  //   </>
  // )


  return (
    <>
      {/* <Navbar /> */}
      {/* <main> */}

      {/* <main className='w-full h-[94vh] flex flex-wrap justify-center p-4'> */}
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
                        {/* <div className="mr-4"> */}

                        <img
                          alt="Product image"
                          src={p.product.image}
                          className="w-20 mr-2 rounded-lg bg-emerald-200"
                        />
                        {/* </div> */}
                        <div>
                          <p className="font-medium">{p.product.name}</p>
                          {/* <p className="text-gray-500">
                        {p.product.description}
                      </p> */}
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
                        {/* <input
                      type="number"
                      className="w-12 border border-gray-400 rounded-lg py-1 px-2 text-center mx-2"

                    /> */}
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
                      {/* <button
                    className="text-gray-600 hover:text-red-500 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="currentColor"
                        d="M16 11V9h-3V6h-2v3H8v2h3v3h2v-3h3zm5-9H3C1.9 2 1 2.9 1 4v1h2V4h18zM5 7h14v14H5z"
                      />
                    </svg>
                  </button> */}
                    </td>
                  </tr>

                ))}
                {/* <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <img
                        src="https://via.placeholder.com/100x100"
                        alt="Product image"
                        className="w-20 h-20 rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Product 2</p>
                      <p className="text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">$29.99</td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <button
                      className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full focus:outline-none"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-12 border border-gray-400 rounded-lg py-1 px-2 text-center mx-2"
                      value="1"
                    />
                    <button
                      className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-4 px-6">$29.99</td>
                <td className="py-4 px-6">
                  <button
                    className="text-gray-600 hover:text-red-500 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="currentColor"
                        d="M16 11V9h-3V6h-2v3H8v2h3v3h2v-3h3zm5-9H3C1.9 2 1 2.9 1 4v1h2V4h18zM5 7h14v14H5z"
                      />
                    </svg>
                  </button>
                </td>
              </tr> */}
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
        {/* ): (<h1>em</h1>)} */}
      {/* </main> */}
    </>
  )


}

export default CartPage