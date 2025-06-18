// create router
const router = require("express").Router()

// Middleware
const sanitizeDatels = require("../middleware/sanitizeDatels.js")

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
  GetById,
  GetLinkById,
  GetUnwantedImage,
  DeleteUnwantedImage,
  GetSettings,
  UpdateSettings,
  DeleteImageById,
  UpdateContent,
  getContentByTitle,
  GetSiteMap
} = require("../controlars/main_controlar")


// routers
router.all("/", (req, resp)=> resp.render("landpage"))

// Add a movie
router.post("/addMovie", sanitizeDatels, addMovie)

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
router.get("/getbyid/:id", GetById)

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
router.get("/movie-by-title/:title",getContentByTitle)

// Get sitemap.xml 
router.get('/sitemap.xml', GetSiteMap);


// export
module.exports = router;