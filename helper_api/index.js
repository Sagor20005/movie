const express = require("express")
const app = express()
const cors = require('cors')

// internul imports
const router = require("./router.js")

// vars
const port = 9000

app.use(cors())
app.use(router)


app.listen(port,()=>{
  console.log("Helper server running..")
})