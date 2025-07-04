const aditionalDataColl = require("../database/models/aditionalData_model.js")

async function addGrnre(genres){
  console.log("hitt")
  try{
    const aditionalData = await aditionalDataColl.find()
    const alradyHaved = aditionalData[0].Genre
    const oldLength = alradyHaved.length
    genres.forEach((genre)=>{
      if(!alradyHaved.includes(genre)){
        alradyHaved.push(genre)
      }
    })
    
    if(oldLength !== alradyHaved.length){
      const update = await aditionalDataColl.findOneAndUpdate({ _id:aditionalData[0]._id },{ Genre: alradyHaved })
    }
    
  }catch(err){
  }
}

module.exports = addGrnre