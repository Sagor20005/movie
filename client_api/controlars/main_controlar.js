const movieColl = require("../database/models/movies_model")
const settingColl = require("../database/models/settings.js")
const imageRecordColl = require("../database/models/imageRecord.js")
const aditionalDataColl = require("../database/models/aditionalData_model.js")

const devolopmentState = process.env.STATE


// All controlars
const ShowMovies = async (req,resp)=>{
  try{
    let response = await movieColl.find({AutoShow: true}).sort({ createdAt: -1 })
    if(response){
      resp.status(200).json({
        data:response
      })
    }else{
      resp.status(404)
    }
  }catch(error){
    resp.status(500).json({
      isOk: false,
      msg: devolopmentState === "devolopment" ? error.message: "Error in getting movies.",
      data:[]
    })
  }
}

// search a movie 
const SearchMovie = async (req,resp)=>{
   const searchedMovies = await movieColl.find({ [req.params.searchBy] :{ $regex: `${req.params.query}` } }).sort({ createdAt: -1 })
   resp.status(200).json({
     data: searchedMovies
   })
}

// Get GetAditionalData
const GetAditionalData = async (req,resp)=>{
  try{
    const response = await aditionalDataColl.find()
    if(response){
      resp.status(200).json({
        isOk: true,
        data: response[0]
      })
    }
  }catch(error){
    resp.status(500).json({
      isOk: true,
      msg: "Server error!"
    })
  }
}

// Get setting obj 
const GetSettings = async (req,resp)=>{
  try{
    const response = await settingColl.find()
    resp.status(200).json({
      isOk: true,
      data: response[0]
    })
  }catch(err){
    resp.status(500).json({
      isOk: false,
      msg: "Server error."
    })
  }
}


// GET CONTENT BY TITLE 
const getContentByTitle = async (req,resp)=>{
  try{
    const Title = req.params.title
    const data = await movieColl.findOne({Title})
    resp.status(200).json({
      isOk:true,
      data
    })
  }catch(err){
    resp.status(200).json({
      isOk:false,
      msg:err.message
    })
  }
}

// Get content by id
const GetById = async (req,resp)=>{
  try{
    const response = await movieColl.findOne({_id:req.params.id})
    if(response){
      resp.status(200).json({
        isOk:true,
        data: response
      })
    }else{
      resp.status(500).json({
        isOk:false,
        msg:"Not found."
      })
    }
    
  }catch(err){
    resp.status(500).json({
      isOk:false,
      msg:"Server error"
    })
  }
}



// Export Controlars
module.exports = {
  ShowMovies,
  SearchMovie,
  GetAditionalData,
  GetSettings,
  getContentByTitle,
  GetById
}