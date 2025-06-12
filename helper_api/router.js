const router = require("express").Router()


const {
  StayAlive
} = require("./controlar.js")


// ROUTES 
router.all("/",(req,resp)=>{
  resp.json({
    state:"helper server running.."
  })
})

// Stay Alive 
router.get("/alive", StayAlive)



module.exports = router