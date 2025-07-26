import { configureStore } from '@reduxjs/toolkit'
import foryouSlice from "../features/foryou/foryou.js"
import searchSlice from "../features/search/searchSlice.js"
import settingSlice from "../features/settings/settingSlice.js"
import aditionalDataSlice from "../features/aditionalData/aditionalDataSlice.js"
import trendingSlice from "../features/Trending/TrendingSlice.js"
import allContentSlice from "../features/allContent/allContentSlice.js"

export default configureStore({
  reducer: {
    foryou: foryouSlice,
    search: searchSlice,
    setting: settingSlice,
    aditionalData: aditionalDataSlice,
    trending: trendingSlice,
    all_content: allContentSlice
  },
})