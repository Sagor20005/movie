

function sanitizeDatels(req,resp,next){
  
  try{
    // must bee field list
    const filedArray = ["Poster","Title","Genre","AutoShow"];
    // cheak all are avleable
    const emptyFields = []
    filedArray.forEach((fild)=>{
      const filedValue =  req.body[fild] ? req.body[fild].trim() : null
      if(!filedValue || filedValue === " " ){
        emptyFields.push(fild)
      }
    })
    // Cheake Download field
    if(JSON.parse(req.body.Downloads).length === 0) emptyFields.push("Downloads")
    if(JSON.parse(req.body.Images).length === 0) emptyFields.push("Images")
    
    
    if(emptyFields.length > 0){
      resp.status(404).json({
        isOk:false,
        msg: `Please fill ${emptyFields} fields.`
      })
    }else{
      next()
    }
    
    
  }catch(error){
    resp.status(500).json({
      isOk:false,
      msg:error.message
    })
  }
}
module.exports = sanitizeDatels