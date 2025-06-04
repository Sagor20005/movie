
import {
  createAlert,
  createLoaderAlert,
  loaderAlertClose,
  isConfromAlert
  } from "/lib/alert.js"
import passedMoment from "/lib/dateTime.js"
  
// IMPORTANT VAR
const server_url = window.location.protocol+"//"+window.location.host

// ELEMENTS IMPORTS
const foryouShowBox = document.querySelector("#foryou_contents")
const searchBar = document.querySelector("#search_box")


// ___________AUTO SHOW ENABLE DISABLE CONTROL

foryouShowBox.addEventListener("click",async (e)=>{
  if(e.target.className === "toggle"){
    createLoaderAlert()
    const Auto = e.target.attributes[0].value === "true" ? false : true
    const _id = e.target.attributes[1].value
    try{
      let response = await fetch(`${server_url}/fildupdate`,{
        method: "put",
        headers: {
          "content-type":"application/json"
        },
        body: JSON.stringify({
          Value:Auto,
          _id,
          Fild: "AutoShow"
        })
      })
      response = await response.json()
      loaderAlertClose()
      if(response && response.isOk){
        createAlert({
          icon:"success",
          text: Auto ? "enable Foryou." : "disable Foryou."
        })
        e.target.attributes[0].value = Auto
        if(Auto){
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

async function getAutoShowData(){ // function for get all newest data
  try{
    createLoaderAlert()
    let autoShowResponse = await fetch(`${server_url}/show-movies`)
    autoShowResponse = await autoShowResponse.json()
    loaderAlertClose()
    console.log(autoShowResponse)
    if(autoShowResponse){
      renderAutoShowData(autoShowResponse.data)
    }else{
      console.log(autoShowResponse)
      createAlert({
        icon:"error",
        text:"An error."
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
getAutoShowData() // call getAutoShowData

function renderAutoShowData(datas){
  foryouShowBox.innerHTML = ""
  
  datas?.forEach((data)=>{
    
  // creating a tranding content
  const foryouContent = document.createElement("div") // content div
  foryouContent.classList.add("foryou_content")
  
  foryouContent.innerHTML = `
  <div class="bannar">
    <img src="${data.Poster}" alt="bannar">
  </div>
  <div class="info">
    <p>${data.Title}</p>
    <span>${passedMoment(data.createdAt)} Ago</span>
    <div class="foryou_controler">
      <span>Newest (off/on)</span>
      <div class="toggle_box"><div Auto="${data.AutoShow}" dbid="${data._id}" class="toggle" ></div></div>
    </div>
    <div class="f_opar_box">
      <a href="/admin/delete-con/${data._id}"> Delete </a>
      <a href="/admin/update-con/${data._id}"> Update </a>
    </div>
  </div>
  `
  const tgl = foryouContent.querySelector(".toggle")
  !data.AutoShow ? tgl.style.left = "10px" : tgl.style.right = '10px'
  foryouShowBox.appendChild(foryouContent)
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
      renderAutoShowData(response.data)
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