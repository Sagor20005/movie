const movieColl = require("../database/models/movies_model")



// GET FORYOU CONTROLAR SECTION
const getForyou = async (req,resp)=>{
  console.log("kkkkk")
  try{
    const data = await movieColl.find({AutoShow:true}).sort({ createdAt: -1 })
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
  console.log("jjjjjj")
   try{
    const data = await movieColl.find({Trand:true}).sort({ createdAt: -1 })
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
    const data = await movieColl.find({New:true}).sort({ createdAt: -1 })
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
    const data = await movieColl.find().sort({ createdAt: -1 })
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

// GET CONTENT BY ID
async function getConById(req,resp){
  try{
    const _id = req.params.id;
    const movie = await movieColl.findOne({_id});
    resp.status(200).json({
      isOk:true,
      movie
    })
  }catch(err){
    resp.status(200).json({
      isOk:false,
      msg: err.message
    })
  }
}
// GET CONTENT BY ID

module.exports = {
  getUpdated,
  getTrending,
  getForyou,
  getAllContent,
  getConById
}