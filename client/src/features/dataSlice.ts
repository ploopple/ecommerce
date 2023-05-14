import { IProductData, IUserData } from './../types/index';
import { createSlice } from "@reduxjs/toolkit"

interface IInitialState {
    userData: IUserData | null
    allProductsData: IProductData[]
    cart: {quantity: number, product: IProductData}[]
}

const initialState: IInitialState = {
    userData: null,
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
            if(state.cart[i].product.stocks >  state.cart[i].quantity) {
            state.cart[i].quantity += 1
            }
        },
        addToNewProduct(state, {payload}){
            state.allProductsData.push(payload)
        }
    }
})

export const { setUser, setAllProducts, updateCart, subtractFromCart, addToCart, addToNewProduct } = dataSlice.actions

export default dataSlice.reducer