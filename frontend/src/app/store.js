import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from "../features/movies/moviesSlice.js"
import searchSlice from "../features/search/searchSlice.js"
import settingSlice from "../features/settings/settingSlice.js"
import aditionalDataSlice from "../features/aditionalData/aditionalDataSlice.js"
import trendingSlice from "../features/Trending/TrendingSlice.js"

export default configureStore({
  reducer: {
    moviesList: moviesSlice,
    search: searchSlice,
    setting: settingSlice,
    aditionalData: aditionalDataSlice,
    trending: trendingSlice
  },
})