const Express = require('express')
const app = Express()
require('dotenv').config()
const cors = require('cors')
const setSetting = require("./utilities/createInitialSetting.js")
const connectDb = require("./database/mongoose.con.js")
const path = require("path")



// intarnal import
const router = require("./routes/main_route")

// important varuables
const port = process.env.PORT

// database connection 
connectDb()

// CALL INITIAL SETTINGS
setSetting()


// app.use()

app.use(cors())
app.use(Express.json())
app.use(router)


// Error handling 
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ message: "Oops! Something went wrong." });
});


app.listen(port,"0.0.0.0",()=> console.log({
  status:"Alive",
  port,
  author:"Jakareya haldar"
}))
