// IMPORTS
import moment from "../lib/dateTime.js"
import {
  createAlert,
  createLoaderAlert,
  loaderAlertClose,
  isConfromAlert
} from "/lib/alert.js"

// ELEMENTS
const listSection = document.querySelector(".cmcl")
const popop_containar = document.querySelector(".popop_containar")
const popop_title = document.querySelector("#popup_title")
const foryou_radio = document.querySelector("#foryou_radio")
const trending_radio = document.querySelector("#trending_radio")
const new_radio = document.querySelector("#new_radio")
const popup_close_btn = document.querySelector(".popup_close_btn")
const curpage = document.querySelector("#curpage")
const type_select = document.querySelector("#type_select")
const statas_select = document.querySelector("#statas_select")
const found_ref = document.querySelector("#found_ref")

// IMPORTANT VARUABLE
let AllContent = []
let subContent = []
let currentPage = 1
const max_show = 5
let all_page_count = 1

// Get Content from database
async function Get_all_content() {
  try {
    createLoaderAlert()
    let response = await fetch("/all")
    response = await response.json()
    loaderAlertClose()
    if (response.isOk) {
      AllContent = response.data
      subContent = response.data
      renderContent(subContent, 1)
      set_pageination_count()
      setFoundTitle()
    } else {
      console.log(response.msg)
    }
  }catch(err) {
    loaderAlertClose()
    console.log(err)
  }
}
Get_all_content() // getting content


// Set Found refarence
function setFoundTitle() {
  found_ref.innerText = `Found: ${subContent.length}/${AllContent.length}`
}


// Render all
function renderContent(contents, page = 1) {
  if (!contents) return false
  listSection.innerHTML = ""
  createLoaderAlert()

  const end = page * max_show
  const start = end - max_show
  contents = contents.slice(start, end)

  contents.forEach((content)=> {
    const html = `
    <div onclick='expandData(${JSON.stringify(content)})' class="cmc">
    <img src="${content.Poster}" alt="error">
    <div>
    <p>${content.Title}</p>
    <small>${moment(content.createdAt)} ago</small>
    </div>
    </div>
    `

    listSection.innerHTML = listSection.innerHTML + html

  })
  loaderAlertClose()
}




// ____________POPUP EXTENDAR FUNCTIONALITY
window.expandData = function(data) {
  popop_containar.style.display = "block"
  popop_containar.setAttribute("_id", data._id)

  popop_title.innerText = data.Title
  foryou_radio.checked = data.AutoShow
  trending_radio.checked = data.Trand
  new_radio.checked = data.New
}

popup_close_btn.addEventListener("click", ()=> popop_containar.style.display = "none")

// Popop State updator functionality
popop_containar.addEventListener("click", async (e)=> {
  const checkboxs = ["Trand", "AutoShow", "New"]
  if (!checkboxs.includes(e.target.name)) return false

  const data = {
    _id: e.target.parentElement.parentElement.getAttribute("_id"),
    Fild: e.target.name,
    Value: e.target.checked
  }

  try {
    let response = await fetch("/fildupdate", {
      method: "put",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    response = await response.json()

    if (response && response.isOk) {
      createAlert( {
        icon: "success",
        text: "Success Oparetion!"
      })
    } else {
      createAlert( {
        icon: "error",
        text: "Faild Oparetion!"
      })
    }
  }catch(err) {
    createAlert( {
      icon: "error",
      text: "Faild Oparetion!"
    })
  }

})

// ____________POPUP EXTENDAR FUNCTIONALITY

// ____________PAGEINATION FYNCTIONALITY

// Set pageination Pages Count
function set_pageination_count() {
  const devide_val_splited = (`${subContent.length/max_show}`).split(".")
  all_page_count = devide_val_splited.length === 1 ? Number(devide_val_splited[0]): Number(devide_val_splited[0])+1
  curpage.innerText = `${currentPage}/${all_page_count}`
}
// Page manager
window.page_controlar = function(type) {
  currentPage = (type === "next" ? (all_page_count > currentPage ? ++currentPage: currentPage): (currentPage > 1 ? --currentPage: currentPage))
  console.log(type === "next")
  renderContent(subContent,
    currentPage)
  set_pageination_count()

}
// ____________PAGEINATION FYNCTIONALITY


// ____________FILTER CONTENT FUNCTIONALITY
window.filterContent = function() {

  const type = type_select.value
  const statas = statas_select.value
  createLoaderAlert()

  if (!type || !statas) return false
  currentPage = 1 // reset currrent page

  const newList = AllContent.filter((movie)=> {
    if (
      movie.Type === type &&
      movie[statas]
    ) return true
  })

  loaderAlertClose()
  subContent = newList
  renderContent(subContent,
    1)
  set_pageination_count()
  setFoundTitle()
}
// ____________FILTER CONTENT FUNCTIONALITY