const aditionalDataColl = require("../database/models/aditionalData_model.js")
const movieColl = require("../database/models/movies_model.js")


// Get home page
const getHome = (req,resp)=>{
  resp.render("index",{scriptFile:"index"})
}


// Get add movie page 
const addMovie = (req,resp)=>{
  resp.render("add_movie",{ scriptFile:"add_movie"})
}


// get aditional info page 
const aditionalInfoPage = (req,resp)=>{
  resp.render("aditionalData",{scriptFile:"aditionalData"})
}

// Get Tranding page 
const TrandingPage = (req,resp)=>{
  resp.render("tranding",{scriptFile:"tranding"})
}

// Get Newest page 
const NewestPage = (req,resp)=>{
  resp.render("new",{scriptFile:"new"})
}

// GET FORYOU 
const foryouPage = (req,resp)=>{
  resp.render("foryou",{scriptFile:"foryou"})
}

// GET UNWANTED IMAGE 
const unwanted_image_page = (req,resp)=>{
  resp.render("unwanted_image_delete",{scriptFile:"unwanted_image"})
}

// GET SETTINGS PAGE 
const GetSettingPage = (req,resp)=>{
  resp.render("settings",{ scriptFile: "settings" })
}


// Get Update Page 
const GetUpdatePage = async (req,resp)=>{
  const {id} = req.params
  
  try{
    const data = await movieColl.findOne({_id:id})
    resp.render("update",{ data, scriptFile:"update" })
  }catch(err){
    resp.render("update",{ data:{}, scriptFile:"update" })
  }
}


// GET DELET PAGE 
const get_delete_page = async (req,resp)=>{
  const { id } = req.params
  try{
    const movie = await movieColl.findOne({_id:id})
    const delResp = await movieColl.findOneAndDelete({_id:id})
    resp.render("delete_con",{
      scriptFile:"delete_con",
      response:{
        status:true,
        movie
      }
    })
  }catch(err){
    resp.render("delete_con",{
      scriptFile:"delete_con",
      response:{
        status:false,
        error:err.message
      }
    })
  }
  
}


// Exports 
module.exports = ({
  getHome,
  addMovie,
  aditionalInfoPage,
  TrandingPage,
  NewestPage,
  foryouPage,
  unwanted_image_page,
  GetSettingPage,
  GetUpdatePage,
  get_delete_page
})