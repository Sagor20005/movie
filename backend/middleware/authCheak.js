const getCookie = require("../utilities/getCookie.js")
const adminAuthColl = require("../database/models/authAdmin.js")

const authCheak = async (req,resp,next)=>{
  const cookie = getCookie(req.headers?.cookie,"npxtkn")
  if(cookie){
    try{
      const auth = await adminAuthColl.findOne({_id:cookie})
      if(auth){
        next()
      }else{
        resp.render("login")
      }
    }catch(err){}
  }else{
    resp.render("login");
  }
}

module.exports = authCheak