import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// server url from .env
const server_url = process.env.REACT_APP_API_URL

export const GetSettings = createAsyncThunk("setting/GetSettings", async ()=>{
  let result = await fetch(`${server_url}/settings`)
  result = await result.json()
  if(result.isOk) return result.data
  if(!result.isOk) return {}
} )

const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    settings:{},
    showSearchResult: false,
    showCategoryComponent: false,
    showSearchInput: false
  },
  reducers: {
    
    // toggle showSearchResult
    SearchResultShow(state){ state.showSearchResult = true },
    SearchResultHide(state){ state.showSearchResult = false },
    
    //Toggle showCategoryComponent
    CategoryComponentShow(state){ state.showCategoryComponent = true },
    CategoryComponentHide(state){ state.showCategoryComponent = false },
    
    //Toggle search input
    searchInputShow(state){ state.showSearchInput = true },
    searchInputHide(state){ state.showSearchInput = false }
  },
  extraReducers: (builder)=>{
    builder.addCase(GetSettings.fulfilled,(state,action)=>{
        state.settings = action.payload
      })
  }
})

// Action creators are generated for each case reducer function
export const {
  SearchResultShow, SearchResultHide,
  CategoryComponentShow, CategoryComponentHide,
  searchInputShow, searchInputHide
} = settingSlice.actions

export default settingSlice.reducer