// create router
const router = require("express").Router()

// Middleware
const sanitizeDatels = require("../middleware/sanitizeDatels.js")
const checkExist = require("../middleware/check_exist.js")

// router imports
const {
  addMovie,
  ShowMovies,
  SearchMovie,
  uploadImage,
  AddAditionalData,
  GetAditionalData,
  DeleteAditionalData,
  GetTranding,
  fildUpdateor,
  getNewest,
  GetLinkById,
  GetUnwantedImage,
  DeleteUnwantedImage,
  GetSettings,
  UpdateSettings,
  DeleteImageById,
  UpdateContent,
  getContentByUrlname,
  GetSiteMap
} = require("../controlars/main_controlar")

const {
  getUpdated,
  getTrending,
  getForyou,
  getAllContent,
  getConById,
  getFeatured
} = require("../controlars/content_get&post.js")


// routers
router.all("/", (req, resp)=> resp.render("landpage"))

// Add a movie
router.post("/addMovie",checkExist, addMovie)

// Get only auto show movie
router.get("/show-movies", ShowMovies)

// Find by search
router.get("/search/:searchBy/:query", SearchMovie)

// upload an image
router.post("/upload-image", uploadImage)

//  Add aditional data
router.post("/aditional", AddAditionalData)

// Get get AddAditionalData
router.get("/aditional", GetAditionalData)

// Delete aditional data
router.delete("/aditional", DeleteAditionalData)

// Get tranding Contrnts
router.get("/tranding", GetTranding)

// UPDATE a fild
router.put("/fildupdate", fildUpdateor)

// Get newest
router.get("/newest", getNewest)

// Get by id
router.get("/getbyid/:id", getConById)

// Get link by id 
router.get("/getlinkbyid/:id/:linkid", GetLinkById)

// Get unwanted_image
router.get("/unwanted_image", GetUnwantedImage)

// Delete image by id
router.delete("/delete-img/:id", DeleteImageById)

// Get unwanted_image
router.delete("/unwanted_image", DeleteUnwantedImage)

// Get setting object
router.get("/settings", GetSettings)

// Update Setting
router.put("/settings", UpdateSettings)

// Update content 
router.put("/update-movie", UpdateContent)

// GET MOVIE BY TITLE 
router.get("/movie-by-urlname/:urlname",getContentByUrlname)

// Get sitemap.xml 
router.get('/sitemap.xml', GetSiteMap);

// GET FORYOU
router.get("/foru",getForyou)
// GET UPDATED
router.get("/updted",getUpdated)
// GET TRENDING
router.get("/trndng",getTrending)
// GET ALL CONTENTS
router.get("/all", getAllContent)
//Get Featured data 
router.get("/featured",getFeatured)

// export
module.exports = router;