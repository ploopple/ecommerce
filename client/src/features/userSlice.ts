import { createSlice } from "@reduxjs/toolkit"

interface IInitialState {
    userData: any
}

const initialState: IInitialState = {
    userData: {}
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser(state: IInitialState, {payload}) {
            console.log(payload)
            state.userData = payload
            
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer