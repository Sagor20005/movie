

//IMPORT ALERT 
import { createAlert, createLoaderAlert, loaderAlertClose,  isConfromAlert }  from "/lib/alert.js"

// ______________GET DADBORD DATA AND RENDER

// get foryou 
async function getForyou(){
  try{
    let response = await fetch("/show-movies")
    response = await response.json()
    if(response && response.data){
      document.querySelector("#foryou_display").innerText = response.data.length
    }
  }catch(err){
    createAlert({
      icon:"error",
      text:"Internal error."
    })
  }
}
getForyou()


async function getTranding(){
  try{
    let response = await fetch("/tranding")
    response = await response.json()
    if(response && response.data){
      document.querySelector("#tranding_display").innerText = response.data.length
    }
  }catch(err){
    createAlert({
      icon:"error",
      text:"Internal error."
    })
  }
}
getTranding()


async function getNewest(){
  try{
    let response = await fetch("/newest")
    response = await response.json()
    console.log(response)
    if(response && response.data){
      document.querySelector("#newest_display").innerText = response.data.length
    }
  }catch(err){
    createAlert({
      icon:"error",
      text:"Internal error."
    })
  }
}
getNewest()

// ________________________END