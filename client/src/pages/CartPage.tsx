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
  return (
    <>
      <Navbar />
      <main className='w-full h-[94vh] flex flex-wrap justify-center p-4'>
        {!cartItems.length ? (
          <h1>You don't have any items to view</h1>
        ) : (
          <div className="pt-8 w-[700px]">
            <h1 className="my-6">you have {cartItems.length} item{cartItems.length > 1 ? "s" : ""}</h1>
            <table className="border">
              <thead>
                <tr className="border">
                  <th className="border w-[15%]">image</th>
                  <th className="border w-[15%]">name</th>
                  <th className="border w-[15%]">quantity</th>
                  <th className="border w-[15%]">price</th>
                </tr>
              </thead>
              <tbody>

                {cartItems.map(p => (
                  <tr key={p.product.id} className="text-center border">
                    <td className="">
                      <img width={100} className='' src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.qcReVnSVjwqWYRhMuEiuqwHaHa%26pid%3DApi&f=1&ipt=648a966b913977453c901fac4464dbd74745755bd70cbc3ef83b3b586e1c3110&ipo=images" alt="" />
                    </td>
                    <td className="border">{p.product.name}</td>
                    <td className=" flex justify-center mt-8">
                      <button className='bg-gray-200 rounded-s-2xl w-14 h-10' onClick={() => dispatch(subtractFromCart(p.product.id))}>-</button>
                      <p className='bg-gray-200 pt-2'>{p.quantity}</p>
                      <button className='bg-gray-200 rounded-e-2xl w-14 h-10' onClick={() => dispatch(addToCart(p.product.id))}>+</button>
                    </td>
                    <td className="border">${p.product.price * p.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!cartItems.length ? (
          <></>
        ) : (
          <div className=" flex flex-col  items-center mt-[50px] ml-8 ">
            <h1 className="bg-gray-200 p-2 rounded-lg">Your total is  ${totoal}</h1>
            <br />
            <button className="text-white bg-green-600 rounded-lg px-4 py-1 text-xl">Buy Now</button>
          </div>
        )}

      </main>
    </>
  )
}

export default CartPage