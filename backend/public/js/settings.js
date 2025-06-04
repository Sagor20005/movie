
// Imports Internal Function
import CompareUpdateSetting from "/lib/compareTwoObj.js"
import { createAlert, createLoaderAlert, loaderAlertClose, isConfromAlert } from "/lib/alert.js"
// ________________ ELEMENTS IMPORTS 
// colors elements 
const Text_color_elm = document.querySelector("#txt_clor")
const background_color_elm = document.querySelector("#bg_clor")
const title_color_elm = document.querySelector("#title_clor")
const link_color_elm = document.querySelector("#link_clor")
const box_bg_color_elm = document.querySelector("#box_bg_clor")
const logo_color_elm = document.querySelector("#logo_clor")
const small_txt_color_elm = document.querySelector("#sml_txt_clor")

// other information imports 
const domain_input = document.querySelector("#domain_input")
const siteName_input = document.querySelector("#siteName_input")

const UpdateFormElement = document.querySelector("#update_form")
// _______________________END

// IMPORTANT VARUABLE 
let existedSetting;


// _______________GET SETTING AND AND RENDER 
{
  // Get settings from database
  async function GetSetting(){
  try{
    createLoaderAlert()
    let response = await fetch("/settings")
    response = await response.json()
    loaderAlertClose()
    if(!response.isOk){
      createAlert({
        icon:"error",
        text:response.msg
      })
    }else{
      existedSetting = response.data
      setValueOnAllElement(response.data)
    }
  }catch(err){
    loaderAlertClose()
    createAlert({
      icon:"error",
      text:"Internal error."
    })
  }
}
  GetSetting()
  
  // sel alll elements value
  function setValueOnAllElement(setting){
  const { Colors  } = setting
  
  // set all colors 
  Text_color_elm.value = Colors.text_color 
  background_color_elm.value = Colors.bg_color
  title_color_elm.value = Colors.title_color
  link_color_elm.value = Colors.link_color
  box_bg_color_elm.value = Colors.box_bg_color
  logo_color_elm.value = Colors.logo_color
  small_txt_color_elm.value = Colors.small_text_color
  
  // set other info
  domain_input.value = setting.Site_url
  siteName_input.value = setting.Site_name
}
}
// _________________________END 


// ________FROM ELEMENT UPDATE FUNCTIONALITY 
function handleUpdateSubmit(e){
  const formData = new FormData(e)
  
  // New Setting obj
  const updatedSetting = {
    Colors:{
      text_color: formData.get("text_color"),
      bg_color: formData.get("bg_color"),
      title_color: formData.get("title_color"),
      box_bg_color: formData.get("box_bg_color"),
      small_text_color: formData.get("small_text_color"),
      link_color: formData.get("link_color"),
      logo_color: formData.get("logo_color")
    },
    Site_url: formData.get("Site_url"),
    Site_name: formData.get("Site_name")
  }
  updatedSetting._id = existedSetting?._id
  // cheake any fild update or not
  const UpdatedFilds = CompareUpdateSetting( 0, Object.keys(updatedSetting), [], existedSetting,updatedSetting )
  if(UpdatedFilds.length === 0 ) { createAlert({icon:"error",text:"Not Looking any changes."}); return false }
  // Get Conformation 
  isConfromAlert({
    icon:"",
    text: `Update : ${UpdatedFilds}`
  },async (agree)=>{
    if(agree){
      try{
        createLoaderAlert()
        let response = await fetch("/settings",{
          method:"PUT",
          body: JSON.stringify(updatedSetting),
          headers:{
            "content-type":"application/json"
          }
        })
        response = await response.json()
        loaderAlertClose()
        if(response && response.isOk) window.location.reload()
        
      }catch(err){
        loaderAlertClose()
        createAlert({icon:"error",text:"Internal error."})
      }
    }else{
      createAlert({
        icon:"error",
        text:"Update Cancel."
      })
    }
    
  })
  
}

UpdateFormElement.addEventListener("submit",(e)=>{
  e.preventDefault()
  handleUpdateSubmit(e.target)
})
// __________________________END 
