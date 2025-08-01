import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// const serverUrl = process.env.SERVER
const serverUrl = process.env.REACT_APP_API_URL

// get autoshow movies thunk
export const getFeatured = createAsyncThunk("featured/getFeatured", async ()=>{
  let response = await fetch(`${serverUrl}/featured`)
  response = await response.json()
  if(response && response.movies) return response.movies
})


const featuredSlice = createSlice({
  name: 'featured',
  initialState: {
    contents : [],
    isLodding:false,
    isError: false,
    error: null
  },
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(getFeatured.fulfilled,(state,action)=>{
      state.contents = action.payload
      state.isLodding = false
      state.isError = false
    })
    .addCase(getFeatured.pending,(state)=>{
      state.isLodding = true
      state.isError = false
    })
    .addCase(getFeatured.rejected,(state,action)=>{
      state.isLodding = false
      state.isError = true
      state.error = action.error.message
    })
  }
})

// Action creators are generated for each case reducer function
//export const {  } = featuredSlice.actions

export default featuredSlice.reducer