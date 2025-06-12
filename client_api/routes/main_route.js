// create router
const router = require("express").Router()


// router imports
const {
  ShowMovies,
  SearchMovie,
  GetAditionalData,
  GetSettings,
  getContentByTitle,
  GetById
} = require("../controlars/main_controlar")


// routers
router.all("/",(req,resp)=>{
  resp.json({
    status:"running.."
  })
})

// Get only auto show movie
router.get("/show-movies", ShowMovies)

// Find by search
router.get("/search/:searchBy/:query", SearchMovie)

// Get get AddAditionalData
router.get("/aditional", GetAditionalData)

// Get setting object
router.get("/settings", GetSettings)

// GET MOVIE BY TITLE 
router.get("/movie-by-title/:title",getContentByTitle)

// Get by id
router.get("/getbyid/:id", GetById)

// export
module.exports = router;