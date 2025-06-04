const movieColl = require("../database/models/movies_model")
const settingColl = require("../database/models/settings.js")
const imageRecordColl = require("../database/models/imageRecord.js")
const aditionalDataColl = require("../database/models/aditionalData_model.js")
const imageKit = require("../utilities/imageKitSetup.js")

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

// Add new movie
const addMovie = async (req, resp)=> {
  try {
    console.log(req.body)
    // form Data object
    const allData = {
      Title: req.body.Title.toLowerCase(),
      Year: req.body.Year,
      Rated: req.body.Rated,
      Released: req.body.Released,
      Runtime: req.body.Runtime,
      Genre: req.body.Genre ? JSON.parse(req.body.Genre) : undefined ,
      Director: req.body.Director,
      Writer: req.body.Writer,
      Actors: req.body.Actors,
      Plot: req.body.Plot,
      Language: req.body.Language,
      Country: req.body.Country,
      imdbRating: req.body.imdbRating,
      imdbVotes: req.body.imdbVotes,
      imdbID: req.body.imdbID,
      Type: req.body.Type.toLowerCase(),
      Images: req.body.Images ? JSON.parse(req.body.Images) : undefined,
      Downloads:  req.body.Downloads ? JSON.parse(req.body.Downloads) : undefined,
      New: req.body.New  ? true : false,
      Trand: req.body.Trand  ? true : false,
      Poster: req.body.Poster,
      AutoShow: req.body.AutoShow ? true : false,
      Category: req.body.Category.toLowerCase(),
      UploadedImageIds: req.body.UploadedImageIds ? JSON.parse(req.body.UploadedImageIds) : undefined
    }
    
    const newMovie = new movieColl(allData)
    const response = await newMovie.save()
      if(response && response._id){
        console.log(response)
        // wait for delete change into false 
        response.UploadedImageIds.forEach(async(id)=>{
          // proti id te jeye waitfordelete false korte hobe
          const makeFalse = await imageRecordColl.findOneAndUpdate({_id:id},{ waitForDelete:false, postId: response._id })
        })
        
        resp.status(200).json({
          isOk:true,
          msg:"Added Success."
        })
      }else{
        resp.status(404).json({
          isOk:false,
          msg:"faild to add."
        })
      }

    }catch(error) {
    resp.status(500).json({
      isOk: false,
      msg: devolopmentState === "devolopment" ? error.message: "Movie add faild."
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

// upload a image and url as response 
const uploadImage = async (req,resp)=>{
  try{
    const files = req.files
    if(files && files.image){
      const imageObj = await imageKit.upload({
        file: files.image.data,
        fileName: files.image.name
      })
      if(imageObj && imageObj.fileId){
        // save image record
        // create imagecoll obj
        const imageRecord = new imageRecordColl({
          fileId: imageObj.fileId,
          url: imageObj.url
        })
        const saved = await imageRecord.save()
        if(saved && saved._id){
          // send resp with record id
          resp.status(200).json({
            isOk: true,
            url: imageObj.url,
            recordId: saved._id
          })
        }else{
          // delete image 
          const deleteImg = await imageKit.deleteFile(imageObj.fileId)
          resp.status(200).json({
            isOk: false,
            msg: "Can't upload!"
          })
        }
      }
    }
    
  }catch(error){
    resp.status(200).json({
      isOk: false,
      msg:"upload faild."
    })
  }
}


// Add aditional data 
const AddAditionalData = async (req,resp)=>{
  try{
    const fildName = req.body.fild ? req.body.fild.trim() : null
    const mainData = req.body.data ? (req.body.data).trim().toLowerCase() : null
    // Cheack document avleavle or not 
    const existedDoc = await aditionalDataColl.find()
    let id = existedDoc[0] ? `${existedDoc[0]._id}` : undefined
    let targetFild = existedDoc[0] ? existedDoc[0][fildName] : undefined
    // Create new document
    if(!id){
      const empty = new aditionalDataColl({})
      const saved = await empty.save()
      if (saved && saved._id) {
        id = `${saved._id}`
        targetFild = saved[fildName]
      }
    }
    
    // push the data and if alrady exist send response
    if(!targetFild.includes(mainData)){
      targetFild.push(mainData)
    }else{
      resp.status(404).json({
        isOk: false,
        msg: "Alrady exist!"
      })
      return false
    }
    
    // put the data in database fild
    const response = await aditionalDataColl.findOneAndUpdate({ _id:id },{ [fildName]: targetFild })
    
    if(response) resp.status(200).json({isOk:true})
    
  }catch(error){
    console.log(error)
    resp.status(500).json({
      isOk: false,
      msg: devolopmentState === "devolopment" ? error.message: "Error in servere."
    })
  }
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

// Delete aditional data 
const DeleteAditionalData = async (req,resp)=>{
  try{
    const { fild, data } = req.body
    if(fild && data){
      const originalData = await aditionalDataColl.find()
      if(originalData && originalData.length > 0){
        const originalFildData = originalData[0][fild]
        if(originalFildData.includes(data)){
          const index = originalFildData.findIndex((d)=> d===data ) // find elem index
          originalFildData.splice(index,1) // delete data
          const deletedRes = await aditionalDataColl.findOneAndUpdate({_id:`${originalData[0]._id}`},{
            [fild]:originalFildData
          })
          if(deletedRes){
            resp.status(200).json({isOk: true})
          }else{
            resp.status(500).json({
              isOk: false,
              msg: "Delete faild!"
            })
          }
        }else{
          resp.status(500).json({
            isOk: false,
            msg: "Alrady deleted!"
          })
        }
      }
    }else{
      resp.status(500).json({
        isOk: false,
        msg: "Can't find data!"
      })
    }
    
  }catch(error){
    resp.status(500).json({
      isOk: false,
      msg: "Server error!"
    })
  }
}


// Get tranding contents
const GetTranding = async (req,resp)=>{
  try{
    const trandingContent = await movieColl.find({Trand:true}).sort({ createdAt: -1 })
    if(trandingContent && trandingContent.length > 0){
      resp.status(200).json({
        isOk:true,
        data:trandingContent
      })
    }else{
      resp.status(500).json({
        isOk: false,
        msg: "Tranding section is empty.",
      })
    }
  }catch(err){
    resp.status(500).json({
      isOk: false,
      msg: devolopmentState === "devolopment" ? err.message: "Error in tranding movies.",
    })
  }
}

// Trand updateor 
const fildUpdateor = async (req,resp)=>{
  try{
    const { _id,Fild,Value } = req.body
    const response = await movieColl.findOneAndUpdate({_id},{[Fild]:Value})
    if(response && response._id){
      resp.status(200).json({
        isOk: true,
      })
    }else{
      resp.status(500).json({
        isOk: false,
        msg: "Change faild."
      })
    }
  }catch(err){
    resp.status(500).json({
      isOk: false,
      msg: "server error."
    })
  }
}

// Get newest content 
const getNewest = async (req,resp)=>{
  try{
    const newestContent = await movieColl.find({New:true}).sort({ createdAt: -1 })
    resp.status(200).json({
      isOk: true,
      data: newestContent
    })
  }catch(err){
    resp.status(500).json({
      isOk: false,
      msg: "server error."
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

// Get unwanted images 
const GetUnwantedImage = async (req,resp)=>{
  try{
    const response = await imageRecordColl.find({waitForDelete:true})
    resp.status(200).json({
      isOk:true,
      data:response
    })
  }catch(e){
    resp.status(500).json({
      isOk:false,
      msg:"server error."
    })
  }
}

// Delete all unwanted images 
const DeleteUnwantedImage = async (req,resp)=>{
  try{
    const allImages = req.body.data
    const lastResult = await Promise.all(allImages.map((img)=>{
      return imageKit.deleteFile(img.fileId)
    }))
    const UpdateResult = await Promise.all(allImages.map((img)=>{
      return imageRecordColl.findOneAndDelete({_id:img._id})
    }))
    
    resp.status(200).json({isOk:true})
    
  }catch(err){
    console.log(err)
    resp.status(500).json({
      isOk: false,
      msg:"Server error."
    })
  }
}

// Delete image by id one by one 
const DeleteImageById = async (req,resp)=>{
  console.log("start delete image", req.params.id)
  const { id } = req.params
  try{
    const DelRecord = await imageRecordColl.findOneAndDelete({_id:id})
    let response = await imageKit.deleteFile(DelRecord.fileId)
    console.log(response)
    resp.status(200).json({
      isOk:true,
      data:"deleted: " + id
    })
  }catch(err){
    console.log(err)
    resp.status(500).json({
      isOk:false,
      message:"delete faild: "+id
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


// Update Settings 
const UpdateSettings = async (req,resp)=>{
  try{
    const updatedSetting = req.body
    if (!updatedSetting?._id) return false // not found then out of function
    const result = await settingColl.findOneAndUpdate({_id:updatedSetting._id},updatedSetting)
    resp.status(200).json({
      isOk: true,
    })
    
  }catch(err){
    resp.status(500).json({
      isOk: false,
      msg:"Server Error."
    })
  }
}

// UPDATE A MOVIE 
const UpdateContent = async (req,resp)=>{
  const Upcontent = req.body;
  const _id = Upcontent._id
  try{
    const updateRes = await movieColl.findOneAndUpdate({_id},Upcontent)
    resp.status(200).json({
      isOk:true,
    })
  }catch(err){
    resp.status(500).json({
      isOk:false,
      msg:"Server error."
    })
  }
}


// Export Controlars
module.exports = {
  ShowMovies,
  addMovie,
  SearchMovie,
  uploadImage,
  AddAditionalData,
  GetAditionalData,
  DeleteAditionalData,
  GetTranding,
  fildUpdateor,
  getNewest,
  GetById,
  GetUnwantedImage,
  DeleteUnwantedImage,
  GetSettings,
  UpdateSettings,
  DeleteImageById,
  UpdateContent
}