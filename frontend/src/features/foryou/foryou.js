import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// const serverUrl = process.env.SERVER
const serverUrl = process.env.REACT_APP_API_URL

// get autoshow foryou thunk
export const getForyou = createAsyncThunk("foryou/getForyou", async ()=>{
  let response = await fetch(`${serverUrl}/foru`)
  response = await response.json()
  if(response && response.data) return response.data
})


const foryouSlice = createSlice({
  name: 'foryou',
  initialState: {
    contents : [],
    isLodding:false,
    isError: false,
    error: null
  },
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(getForyou.fulfilled,(state,action)=>{
      state.contents = action.payload
      state.isLodding = false
      state.isError = false
    })
    .addCase(getForyou.pending,(state)=>{
      state.isLodding = true
      state.isError = false
    })
    .addCase(getForyou.rejected,(state,action)=>{
      state.isLodding = false
      state.isError = true
      state.error = action.error.message
    })
  }
})

// Action creators are generated for each case reducer function
//export const {  } = foryouSlice.actions

export default foryouSlice.reducer