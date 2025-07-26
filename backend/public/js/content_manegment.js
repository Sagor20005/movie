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
const isTrueOrNot = document.querySelector("#select_istrue")
const delete_item_btn = document.querySelector("#delete_item_btn")
const update_item_btn = document.querySelector("#update_item_btn")
const copy_post_btn = document.querySelector("#copy_curr_post_btn")

// IMPORTANT VARUABLE
let AllContent = []
let subContent = []
let currentPage = 1
let currentType = "movie"
let filterStatus = "all"
let filterApply = true
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
      // Call apply changeUpdate
      changeUpdate( data._id, data.Fild, data.Value, currentPage, currentType, filterStatus, filterApply );
      
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

// Gi to Delete functionality page
delete_item_btn.addEventListener("click",(e)=>{
  isConfromAlert({
    title:"You sure?",
    text:"What you want to delete!"
  },(ok)=>{
    if (!ok) return false
    const _id = e.target.parentElement.parentElement.getAttribute("_id");
    window.open(`/admin/delete-con/${_id}`)
  })
})

//  Go to Update functionality page
update_item_btn.addEventListener("click",(e)=>{
  const _id = e.target.parentElement.parentElement.getAttribute("_id");
  window.open(`/admin/update-con/${_id}`)
})


// Update local varuable when any action parform
function changeUpdate(_id,fild,value,currPage,currType,currState,currApply){
  const index = AllContent.findIndex((c)=> c._id === _id ); // Find iindex
  AllContent[index][fild] = value; // Apply
  findFilter(currType,currState,currApply,currPage);
}



// Copy post functionality
copy_post_btn.addEventListener("click",async (e)=>{
  const _id = e.target.parentElement.parentElement.getAttribute("_id");
  try{
    let response = await fetch(`/getbyid/${_id}`);
    response = await response.json()
    if(response && response.isOk){
      GenaretePost(response.movie)
    }
  }catch(err){
    console.log(err)
  }
})

function GenaretePost(data){
  if( !data || !data.Title ) return false
  
  const caption = `🎬 ${data.Title.slice(0,1).toUpperCase() + data.Title.slice(1)} 🔥
Link 👉 https://newflex.vercel.app/${data.Type}/${data.url_name}

⚡সাইটে আপলোড করা হয়েছে💥
⚡সবার আগে দেখুন 🌟
✅ Quality : High Rasulation 🔔
📥 Visit And Download Now

${"📦 Genre : " + data.Genre}
${"📂 Options : " +data.Downloads.map((d)=>d.quality)}\n

____________________
Link 👉 https://newflex.vercel.app/${data.Type}/${data.url_name}
____________________

✅ সবার আগে সকল নতুন মুভি দেখতে আমাদের সাথে যুক্ত হন 🤝
🌐 https://newflex.vercel.app

${"🏷️ Year : " + data.Year}

${"📑 Plot: "+data.Plot}

${"🎭 Actors: "+data.Actors}
  `
  
  navigator.clipboard.writeText(caption)
  
  // download all images 
  data?.Images?.forEach(async (image,i)=>{
    const f = await fetch(image)
    const blob = await f.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download= data.Title+ " (" + i + ").png"
    a.click()
    setTimeout(()=>{URL.revokeObjectURL(url)},5000)
  })
  // Download poster 
  if(data?.Poster){
    async function dp(){
      const f = await fetch(data.Poster)
      const blob = await f.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download= data.Title+ " ("-").png"
      a.click()
      setTimeout(()=>{URL.revokeObjectURL(url)},5000)
    }
    dp()
  }
  
  
}

// ____________POPUP EXTENDAR FUNCTIONALITY

// ____________PAGEINATION FYNCTIONALITY

// Set pageination Pages Count
function set_pageination_count() {
  const devide_val_splited = (`${subContent.length/max_show}`).split(".")
  all_page_count = devide_val_splited.length === 1 ? Number(devide_val_splited[0]): Number(devide_val_splited[0])+1
  currentPage = all_page_count < currentPage ? --currentPage : currentPage
  curpage.innerText = `${currentPage}/${all_page_count}`
}
// Page manager
window.page_controlar = function(type) {
  currentPage = (type === "next" ? (all_page_count > currentPage ? ++currentPage: currentPage): (currentPage > 1 ? --currentPage: currentPage))
  renderContent(subContent,
    currentPage)
  set_pageination_count()

}
// ____________PAGEINATION FYNCTIONALITY


// ____________FILTER CONTENT FUNCTIONALITY

window.filterContent = function(){
  const type = type_select.value
  const statas = statas_select.value
  const isTrueOrFalse = isTrueOrNot.value ? true : false
  
  // Set filter info on uppar varuable
  currentType = type
  filterStatus = statas
  filterApply = isTrueOrFalse
  
  findFilter(type,statas,isTrueOrFalse); // Search
}

function findFilter(type,statas,isTrueOrFalse,pageNumber=1) {
  createLoaderAlert()
  if (!type || !statas) return false
  currentPage = pageNumber // reset currrent page
  pageNumber = pageNumber !== 1 ? currentPage : pageNumber// If pageNumber set but its bigg morthen currentPage
  
  let newList = []
  
  if(statas === "all"){
    newList = AllContent.filter((movie)=> {
    if (movie.Type === type) return true
    })
  }else{
    newList = AllContent.filter((movie)=> {
    if (
        movie.Type === type &&
        movie[statas] === isTrueOrFalse
      ) return true
    })
  }

  

  loaderAlertClose()
  subContent = newList
  set_pageination_count()
  renderContent(subContent, pageNumber)
  setFoundTitle()
}
// ____________FILTER CONTENT FUNCTIONALITY