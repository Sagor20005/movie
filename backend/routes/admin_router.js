const adminRouter = require("express").Router()
// Imports Middlewares
const setAditionalInfo = require("../middleware/setAditionalInfo")

// imports Controlars
const {
  TarnOn,
  CallHelper,
  getHome,
  addMovie,
  aditionalInfoPage,
  TrandingPage,
  NewestPage,
  foryouPage,
  unwanted_image_page,
  GetSettingPage,
  GetUpdatePage,
  get_delete_page
} = require("../controlars/admin_controlar.js")

// For tarning on every 5 minit
adminRouter.get("/tarnon",TarnOn)
adminRouter.get("/call-helper", CallHelper)

// geg home page
adminRouter.get("/", setAditionalInfo, getHome)
// get add movie page
adminRouter.get("/add-movie", setAditionalInfo, addMovie)
// get aditional Info page
adminRouter.get("/aditional", setAditionalInfo, aditionalInfoPage)

// Tranding page
adminRouter.get("/tranding", setAditionalInfo, TrandingPage)

// Newest page
adminRouter.get("/newest", setAditionalInfo, NewestPage)

// Get foryou page
adminRouter.get("/foryou", setAditionalInfo, foryouPage)

// GET UNWANTED IMAGE PAGE
adminRouter.get("/unwanted_image", unwanted_image_page)

// GET SETTING PAGE
adminRouter.get("/settings", GetSettingPage)

// Get Update Page
adminRouter.get("/update-con/:id", GetUpdatePage)

// Delete a content page 
adminRouter.get("/delete-con/:id", get_delete_page)


// Exports
module.exports = adminRouter