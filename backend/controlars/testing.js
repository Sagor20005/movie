const fs = require("fs");
const path = require("path");
const movieColl = require("../database/models/movies_model")
const settingColl = require("../database/models/settings.js")
const imageRecordColl = require("../database/models/imageRecord.js")
const aditionalDataColl = require("../database/models/aditionalData_model.js")


const dir = path.join(__dirname,"../backup/");

async function backup(){
  const movie_backup = await movieColl.find();
  const setting_backup = await settingColl.find();
  const imageRecord_backup = await imageRecordColl.find();
  const aditionaldata_backup = await aditionalDataColl.find();
  
  fs.writeFile(dir+"movie.json",JSON.stringify(movie_backup),(err)=>{
    if(err) console.log("Faild to save Movie.")
    if(!err) console.log("saved Movie.")
  })
  fs.writeFile(dir+"setting.json",JSON.stringify(setting_backup),(err)=>{
    if(err) console.log("Faild to save imageRecord_backup.")
    if(!err) console.log("saved setting_backup.")
  })
  fs.writeFile(dir+"image_rec.json",JSON.stringify(imageRecord_backup),(err)=>{
    if(err) console.log("Faild to save imageRecord_backup.",err)
    if(!err) console.log("saved imageRecord_backup.")
  })
  fs.writeFile(dir+"aditional.json",JSON.stringify(aditionaldata_backup),(err)=>{
    if(err) console.log("Faild to save aditionaldata_backup.")
    if(!err) console.log("saved aditionaldata_backup.")
  })
  
}
//backup()