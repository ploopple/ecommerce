import { useDispatch, useSelector } from "react-redux"
import Navbar from "../components/Navbar"
import { RootState } from "../app/store"
import { addToCart, subtractFromCart } from "../features/dataSlice"

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.data.cart)
  const dispatch = useDispatch()
  return (
    <>
      <Navbar />
      <main className='w-full h-[94vh]'>
        {!cartItems.length ? (
          <h1>You don't have any items to view</h1>
        ) : (
          <div className="p-8">
            <h1 className="my-6">you have {cartItems.length} item{cartItems.length > 1 ? "s": ""}</h1>
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
      </main>
    </>
  )
}

export default CartPage