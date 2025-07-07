const movieColl = require("../database/models/movies_model")


const getForyou = async (req,resp)=>{
  try{
    const data = await movieColl.find({AutoShow:true})
    resp.status(200).json({
      isOk:true,
      data
    })
  }catch(err){
    resp.status(500).json({
      isOk:false,
      msg:"Not found Error!"
    })
  }
}
const getTrending = async (req,resp)=>{
   try{
    const data = await movieColl.find({Trand:true})
    resp.status(200).json({
      isOk:true,
      data
    })
  }catch(err){
    resp.status(500).json({
      isOk:false,
      msg:"Not found Error!"
    })
  }
}
const getUpdated = async (req,resp)=>{
   try{
    const data = await movieColl.find({New:true})
    resp.status(200).json({
      isOk:true,
      data
    })
  }catch(err){
    resp.status(500).json({
      isOk:false,
      msg:"Not found Error!"
    })
  }
}


module.exports = {
  getUpdated,
  getTrending,
  getForyou
}