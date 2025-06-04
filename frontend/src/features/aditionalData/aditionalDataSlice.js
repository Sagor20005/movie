import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// const serverUrl = process.env.SERVER
const serverUrl = process.env.REACT_APP_API_URL

// get autoshow movies thunk
export const getAditionalData = createAsyncThunk("aditional/getAditionalData", async ()=>{
  let response = await fetch(`${serverUrl}/aditional`)
  response = await response.json()
  if(response && response.data) return response.data
})


const aditionalDataSlice = createSlice({
  name: 'aditional',
  initialState: {
    data: {},
    isLodding:false,
    isError: false,
    error: null
  },
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(getAditionalData.fulfilled,(state,action)=>{
      state.data = action.payload
      state.isLodding = false
      state.isError = false
    })
    .addCase(getAditionalData.pending,(state)=>{
      state.isLodding = true
      state.isError = false
    })
    .addCase(getAditionalData.rejected,(state,action)=>{
      state.isLodding = false
      state.isError = true
      state.error = action.error.message
    })
  }
})

// Action creators are generated for each case reducer function
//export const {  } = moviesSlice.actions

export default aditionalDataSlice.reducer