const movieColl = require("../database/models/movies_model")



// GET FORYOU CONTROLAR SECTION
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
// GET FORYOU CONTROLAR SECTION

// GET TRENDING CONTROLAR SECTION
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
// GET TRENDING CONTROLAR SECTION

// GET UPDATED CONTROLAR SECTION
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
// GET UPDATED CONTROLAR SECTION

// GET ALL CONTENT CONTROLAT
const getAllContent = async (req,resp)=>{
   try{
    const data = await movieColl.find()
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
// GET ALL CONTENT CONTROLAT

module.exports = {
  getUpdated,
  getTrending,
  getForyou,
  getAllContent
}