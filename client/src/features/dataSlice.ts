import { createSlice } from "@reduxjs/toolkit"

interface IInitialState {
    userData: any
    allProductsData: any
}

const initialState: IInitialState = {
    userData: {},
    allProductsData: {}
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
        }
    }
})

export const { setUser, setAllProducts } = dataSlice.actions

export default dataSlice.reducer