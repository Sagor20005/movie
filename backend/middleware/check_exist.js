const movieColl = require("../database/models/movies_model")

async function cheakExist(req,resp,next){
  try{
    let isExist = await movieColl.findOne({ Title: req.body.Title })
    if(!isExist){
      next()
    }else{
      resp.status(404).json({
        isOk: false,
        msg: "alrady added."
      })
    }
  }catch(err){
    resp.status(404).json({
      isOk: false,
      msg: err.message
    })
  }
}

module.exports = cheakExist