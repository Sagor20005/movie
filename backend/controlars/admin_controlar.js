const adminAuthColl = require("../database/models/authAdmin.js")




// LOGIN 
const Login = async (req,resp)=>{
  try{
    const auth = await adminAuthColl.find()
    // if not exist
    if(auth && auth.length < 1){
      const data = new adminAuthColl(req.body)
      const saved = await data.save()
      resp.json({
        isOk:true,
        token:saved._id
      })
    }else{
    // if exist 
    const isValid = await adminAuthColl.findOne(req.body)
    if(isValid){
      resp.status(200).json({
        isOk:true,
        token:isValid._id
      })
    }else{
      resp.status(200).json({
        isOk:false,
        msg:"Wrong please try again!"
      })
    }
    }
  }catch(err){
    resp.status(200).json({
      isOk:false,
      msg:err.message
    })
  }
}


// Exports 
module.exports = ({
  Login
})