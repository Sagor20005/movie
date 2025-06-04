import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// const serverUrl = process.env.SERVER
const serverUrl = process.env.REACT_APP_API_URL

// get autoshow movies thunk
export const getMovies = createAsyncThunk("movies/getMovies", async ()=>{
  let response = await fetch(`${serverUrl}/show-movies`)
  response = await response.json()
  if(response && response.data) return response.data
})


const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    contents : [],
    isLodding:false,
    isError: false,
    error: null
  },
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(getMovies.fulfilled,(state,action)=>{
      state.contents = action.payload
      state.isLodding = false
      state.isError = false
    })
    .addCase(getMovies.pending,(state)=>{
      state.isLodding = true
      state.isError = false
    })
    .addCase(getMovies.rejected,(state,action)=>{
      state.isLodding = false
      state.isError = true
      state.error = action.error.message
    })
  }
})

// Action creators are generated for each case reducer function
//export const {  } = moviesSlice.actions

export default moviesSlice.reducer