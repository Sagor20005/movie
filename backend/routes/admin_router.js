const adminRouter = require("express").Router()
// Imports Middlewares
const setAditionalInfo = require("../middleware/setAditionalInfo")
const authCheak = require("../middleware/authCheak.js")

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
  get_delete_page,
  GetLoginPage,
  Login
} = require("../controlars/admin_controlar.js")

// For tarning on every 5 minit
adminRouter.get("/tarnon",TarnOn)
adminRouter.get("/call-helper", CallHelper)

// geg home page
adminRouter.get("/",authCheak, setAditionalInfo, getHome)
// get add movie page
adminRouter.get("/add-movie", authCheak, setAditionalInfo, addMovie)
// get aditional Info page
adminRouter.get("/aditional", authCheak, setAditionalInfo, aditionalInfoPage)

// Tranding page
adminRouter.get("/tranding", authCheak, setAditionalInfo, TrandingPage)

// Newest page
adminRouter.get("/newest", authCheak, setAditionalInfo, NewestPage)

// Get foryou page
adminRouter.get("/foryou", authCheak, setAditionalInfo, foryouPage)

// GET UNWANTED IMAGE PAGE
adminRouter.get("/unwanted_image", authCheak, unwanted_image_page)

// GET SETTING PAGE
adminRouter.get("/settings", authCheak, GetSettingPage)

// Get Update Page
adminRouter.get("/update-con/:id", authCheak, GetUpdatePage)

// Delete a content page 
adminRouter.get("/delete-con/:id", authCheak, get_delete_page)

// REDIRECT LOGIN PAGE
adminRouter.get("/login",GetLoginPage)

// Login 
adminRouter.post("/login",Login)


// Exports
module.exports = adminRouter