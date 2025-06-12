
const sendReqToServer = require("./utilities/sentReqToServer.js")

const server_url = "https://movie-by36.onrender.com/admin/tarnon"

// STAY ALIVE  
const StayAlive = (req,resp)=>{
  sendReqToServer(server_url)
  resp.json({
    server: "helper",
    alive:true
  })
}


module.exports = {
  StayAlive
}