import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// const serverUrl = process.env.SERVER
const serverUrl = process.env.REACT_APP_API_URL

// get autoshow movies thunk
export const getTrending = createAsyncThunk("trending/getTrending", async ()=>{
  let response = await fetch(`${serverUrl}/trndng`)
  response = await response.json()
  if(response && response.data) return response.data
})


const trendingSlice = createSlice({
  name: 'trending',
  initialState: {
    contents : [],
    isLodding:false,
    isError: false,
    error: null
  },
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(getTrending.fulfilled,(state,action)=>{
      state.contents = action.payload
      state.isLodding = false
      state.isError = false
    })
    .addCase(getTrending.pending,(state)=>{
      state.isLodding = true
      state.isError = false
    })
    .addCase(getTrending.rejected,(state,action)=>{
      state.isLodding = false
      state.isError = true
      state.error = action.error.message
    })
  }
})

// Action creators are generated for each case reducer function
//export const {  } = trendingSlice.actions

export default trendingSlice.reducer