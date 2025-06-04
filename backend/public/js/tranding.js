
import {
  createAlert,
  createLoaderAlert,
  loaderAlertClose,
  isConfromAlert
  } from "../lib/alert.js"
  import passedMoment from "/lib/dateTime.js"
  
// IMPORTANT VAR
const server_url = window.location.protocol+"//"+window.location.host

// ELEMENTS IMPORTS
const trandingShowBox = document.querySelector("#tranding_contents")
const searchBar = document.querySelector("#search_box")


// ___________TRANDING ENABLE DISABLE CONTROL

trandingShowBox.addEventListener("click",async (e)=>{
  if(e.target.className === "toggle"){
    createLoaderAlert()
    const Trand = e.target.attributes[0].value === "true" ? false : true
    const _id = e.target.attributes[1].value
    try{
      let response = await fetch(`${server_url}/fildupdate`,{
        method: "put",
        headers: {
          "content-type":"application/json"
        },
        body: JSON.stringify({
          Value:Trand,
          _id,
          Fild:"Trand"
        })
      })
      response = await response.json()
      loaderAlertClose()
      if(response && response.isOk){
        createAlert({
          icon:"success",
          text: Trand ? "enable Tranding." : "disable Tranding."
        })
        e.target.attributes[0].value = Trand
        if(Trand){
          e.target.style.right = "10px"
          e.target.style.left = ""
        }else{
          e.target.style.right = ""
          e.target.style.left = "10px"
        }
      }else{
        createAlert({
          icon:"error",
          text: response.message
        })
      }
    }catch(err){
      loaderAlertClose()
      createAlert({
        icon:"error",
        text: err.message
      })
    }
    
  }
})

// _____________________________END

// _________GET TRANDING AND PLACE IN DOCUMENT START

async function getTrandingData(){ // function for get all tranding data
  try{
    createLoaderAlert()
    let trandResponse = await fetch(`${server_url}/tranding`)
    trandResponse = await trandResponse.json()
    loaderAlertClose()
    if(trandResponse && trandResponse.isOk){
      renderTrandingData(trandResponse.data)
    }else{
      createAlert({
        icon:"error",
        text:trandResponse.msg
      })
    }
  }catch(err){
    loaderAlertClose()
    createAlert({
      icon:"error",
      text:err.message
    })
  }
}
getTrandingData() // call getTrandingData

function renderTrandingData(datas){
  trandingShowBox.innerHTML = ""
  
  datas?.forEach((data)=>{
    
  // creating a tranding content
  const trandingContent = document.createElement("div") // content div
  trandingContent.classList.add("tranding_content")
  
  trandingContent.innerHTML = `
  <div class="bannar">
    <img src="${data.Poster}" alt="bannar">
  </div>
  <div class="info">
    <p>${data.Title}</p>
    <span>${passedMoment(data.createdAt)} Ago</span>
    <div class="trand_controler">
      <span>Tranding (off/on)</span>
      <div class="toggle_box"><div trand="${data.Trand}" dbid="${data._id}" class="toggle" ></div></div>
    </div>
  </div>
  `
  const tgl = trandingContent.querySelector(".toggle")
  !data.Trand ? tgl.style.left = "10px" : tgl.style.right = '10px'
  trandingShowBox.appendChild(trandingContent)
  })
  
  
}

// _________GET TRANDING AND PLACE IN DOCUMENT END


// ______________SEARCH BAR HANDLER START

searchBar.addEventListener("submit",async (e)=>{
  e.preventDefault()
  try{
    createLoaderAlert()
    const query = e.target.query.value.toLowerCase();
    let response = await fetch(`${server_url}/search/Title/${query}`)
    response = await response.json()
    loaderAlertClose()
    if(response && response.data.length > 0){
      renderTrandingData(response.data)
    }else{
      createAlert({
        icon:"error",
        text:"Not found."
      })
    }
  }catch(err){
    loaderAlertClose()
    createAlert({
      icon:"error",
      text: err.message
    })
  }
})

// _______________SEARCH BAR HANDLER END