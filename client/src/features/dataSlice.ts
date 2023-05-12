import { createSlice } from "@reduxjs/toolkit"

interface IInitialState {
    userData: any
    allProductsData: any[]
    cart: any[]
}

const initialState: IInitialState = {
    userData: {},
    allProductsData: [],
    cart: []
}

const dataSlice = createSlice({
    name: "dataSlice",
    initialState,
    reducers: {
        setUser(state: IInitialState, {payload}) {
            state.userData = payload
        },
        setAllProducts(state, {payload}) {
            state.allProductsData = payload
            // console.log(payload)
        },
        updateCart(state, {payload}){
            const i = state.cart.findIndex(item => item.product.id === payload.product.id)
            if(i >= 0) {
                state.cart[i].quantity += payload.quantity 
            } else {
                state.cart.push( payload )
            }
        },
        subtractFromCart(state, {payload}){
            const i = state.cart.findIndex(item => item.product.id === payload)
            state.cart[i].quantity -= 1
            if(state.cart[i].quantity === 0) {
                state.cart.splice(i,1)
            }
        },
        addToCart(state, {payload}){
            const i = state.cart.findIndex(item => item.product.id === payload)
            console.log(state.cart[i].product.stocks ,  state.cart[i].quantity)
            if(state.cart[i].product.stocks >  state.cart[i].quantity) {
            state.cart[i].quantity += 1
                // state.cart.splice(i,1)
            }
        }
    }
})

export const { setUser, setAllProducts, updateCart, subtractFromCart, addToCart } = dataSlice.actions

export default dataSlice.reducer