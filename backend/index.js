const Express = require('express')
const app = Express()
require('dotenv').config()
const cors = require('cors')
const ejs = require("ejs")
const fileUpload = require('express-fileupload');
const setSetting = require("./utilities/createInitialSetting.js")
const connectDb = require("./database/mongoose.con.js")



// intarnal import
const router = require("./routes/main_route")
const admin_router = require("./routes/admin_router")

// important varuables
const port = process.env.PORT

// database connection 
connectDb()

// CALL INITIAL SETTINGS
setSetting()

app.set('view engine', 'ejs')


// app.use()
app.use(Express.static('public'))
app.use(cors())
app.use(fileUpload({
  limits: { fileSize: 10 * 1024 *1024},
}));
app.use(Express.json())
app.use(router)
app.use("/admin",admin_router)


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