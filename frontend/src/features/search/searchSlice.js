import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// const serverUrl = process.env.SERVER
const serverUrl = process.env.REACT_APP_API_URL

// get autoshow movies thunk
export const GetBySearch = createAsyncThunk("movies/GetBySearch", async ({searchBy,query})=>{
  let response = await fetch(`${serverUrl}/search/${searchBy}/${query}`)
  response = await response.json()
  if(response && response.data) return response.data
})


const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    searchComponent: false,
    contents : [],
    isLodding:false,
    isError: false,
    error: null
  },
  reducers: {
    hideSearchComponent(state){
      state.searchComponent = false;
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(GetBySearch.fulfilled,(state,action)=>{
      state.contents = action.payload
      state.isLodding = false
      state.isError = false
    })
    .addCase(GetBySearch.pending,(state)=>{
      state.isLodding = true
      state.isError = false
      state.searchComponent = true
    })
    .addCase(GetBySearch.rejected,(state,action)=>{
      state.isLodding = false
      state.isError = true
      state.error = action.error.message
    })
  }
})

// Action creators are generated for each case reducer function
export const { hideSearchComponent } = SearchSlice.actions

export default SearchSlice.reducer