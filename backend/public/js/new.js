
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
const newestShowBox = document.querySelector("#newest_contents")
const searchBar = document.querySelector("#search_box")


// ___________NEWEST ENABLE DISABLE CONTROL

newestShowBox.addEventListener("click",async (e)=>{
  if(e.target.className === "toggle"){
    createLoaderAlert()
    const New = e.target.attributes[0].value === "true" ? false : true
    const _id = e.target.attributes[1].value
    try{
      let response = await fetch(`${server_url}/fildupdate`,{
        method: "put",
        headers: {
          "content-type":"application/json"
        },
        body: JSON.stringify({
          Value:New,
          _id,
          Fild: "New"
        })
      })
      response = await response.json()
      loaderAlertClose()
      if(response && response.isOk){
        createAlert({
          icon:"success",
          text: New ? "enable Newest." : "disable Newest."
        })
        e.target.attributes[0].value = New
        if(New){
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

// _________GET NEWEST AND PLACE IN DOCUMENT START

async function getNewestData(){ // function for get all newest data
  try{
    createLoaderAlert()
    let newestResponse = await fetch(`${server_url}/newest`)
    newestResponse = await newestResponse.json()
    loaderAlertClose()
    if(newestResponse && newestResponse.isOk){
      renderNewestData(newestResponse.data)
    }else{
      createAlert({
        icon:"error",
        text:newestResponse.msg
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
getNewestData() // call getNewestData

function renderNewestData(datas){
  newestShowBox.innerHTML = ""
  
  datas?.forEach((data)=>{
    
  // creating a tranding content
  const newestContent = document.createElement("div") // content div
  newestContent.classList.add("newest_content")
  
  newestContent.innerHTML = `
  <div class="bannar">
    <img src="${data.Poster}" alt="bannar">
  </div>
  <div class="info">
    <p>${data.Title}</p>
    <span>${passedMoment(data.createdAt)} Ago</span>
    <div class="newest_controler">
      <span>Newest (off/on)</span>
      <div class="toggle_box"><div newest="${data.New}" dbid="${data._id}" class="toggle" ></div></div>
    </div>
  </div>
  `
  const tgl = newestContent.querySelector(".toggle")
  !data.New ? tgl.style.left = "10px" : tgl.style.right = '10px'
  newestShowBox.appendChild(newestContent)
  })
  
  
}

// _________GET NEWEST AND PLACE IN DOCUMENT END


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
      renderNewestData(response.data)
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