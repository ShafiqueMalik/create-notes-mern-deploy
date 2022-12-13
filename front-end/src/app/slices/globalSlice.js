import { createSlice } from '@reduxjs/toolkit'

const user = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):null;

const initialState = {
    loggedInUser:user,
    searchTerm:"",
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLoggedInUser :(state,action)=>{
            console.log("PAYLOAD:",action.payload)
            state.loggedInUser = action.payload
        },
        setSearchTerm :(state,action)=>{
            state.searchTerm = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLoggedInUser,setSearchTerm } = globalSlice.actions

export default globalSlice.reducer