// IMPORTS ALERT
import { createAlert, createLoaderAlert, loaderAlertClose, isConfromAlert } from "/lib/alert.js"

// ELEMENTS IMPORTS 
const imageListElm = document.querySelector("#image_list")


// IMPORTANT VARUABLE
let UnwantedImagesArray = []



// _____________DELETE ALL IMAGES FUNCTIONALITY

const deleteBtn = document.querySelector("#delete_all_btn").addEventListener("click",()=> HandleDeleteBtn(UnwantedImagesArray))
async function HandleDeleteBtn(images){
  try{
    createLoaderAlert()
    let response = await fetch("/unwanted_image",{
      method:"DELETE",
      body: JSON.stringify({
        data:UnwantedImagesArray
      }),
      headers:{
        "content-type":"application/json"
      }
    })
    response = await response.json()
    loaderAlertClose()
    if(response && response.isOk) window.location.reload()
    
  }catch(err){
    loaderAlertClose()
    createAlert({
      icon:"error",
      text: "Internal error."
    })
  }
}

// _________________________END



// __________GET ALL UNWANTED IMAGES AND RENDER

async function GetUnwanted(){
  try{
   let response = await fetch("/unwanted_image")
   response = await response.json()
   // empty alert
   if (response && response.data && response.data.length<1) createAlert({
     icon:"success",
     text: "Not found any unwanted image."
   })
   // call render function
   if(response && response.data){
     UnwantedImagesArray = response.data
     renderUnwantedImages(response.data)
   }
  }catch(e){}
}
GetUnwanted()

function renderUnwantedImages(images){
  imageListElm.innerHTML = ""
  images.forEach((image)=>{
    const img = document.createElement("img")
    img.src = image.url
    img.alt = image._id
    imageListElm.appendChild(img)
  })
}

//   _______________________END