import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// const serverUrl = process.env.SERVER
const serverUrl = process.env.REACT_APP_API_URL

// get autoshow foryou thunk
export const getContents = createAsyncThunk("allContent/getContents", async ()=>{
  let response = await fetch(`${serverUrl}/all`)
  response = await response.json()
  if(response && response.data) return response.data
})


const allContents = createSlice({
  name: 'allContents',
  initialState: {
    contents : [],
    isLodding:false,
    isError: false,
    error: null
  },
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(getContents.fulfilled,(state,action)=>{
      state.contents = action.payload
      state.isLodding = false
      state.isError = false
    })
    .addCase(getContents.pending,(state)=>{
      state.isLodding = true
      state.isError = false
    })
    .addCase(getContents.rejected,(state,action)=>{
      state.isLodding = false
      state.isError = true
      state.error = action.error.message
    })
  }
})

// Action creators are generated for each case reducer function
//export const {  } = allContents.actions

export default allContents.reducer