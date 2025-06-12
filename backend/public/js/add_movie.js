import {
  createAlert,
  createLoaderAlert,
  loaderAlertClose
} from "../lib/alert.js"

const form = document.querySelector("#add_movie_form")
const genre_select = document.querySelector("#chose_genre_section")
const Genre_section = document.querySelector("#Genre_section")

// IMPORTANT VARUABLES

const server_url = window.location.protocol+"//"+window.location.host
const Genre_list = []
const DownloadLinkList = []
const ImagesList = []
const uploadRecordIds = []
let Poster = ""
let tempPosterId = null

//Submit form
form.addEventListener("submit", async (e)=> {
  createLoaderAlert()
  e.preventDefault()
  try {
    const formData = new FormData(e.target)
    formData.append("Genre", JSON.stringify(Genre_list))
    formData.append("Downloads", JSON.stringify(DownloadLinkList))
    formData.append("Images",JSON.stringify(ImagesList))
    formData.append("Poster",Poster)
    formData.append("UploadedImageIds",JSON.stringify(uploadRecordIds))

    let resp = await fetch(`${server_url}/addMovie`, {
      method: "post",
      body: formData
    })
    resp = await resp.json()
    if (resp && resp.isOk) {
      loaderAlertClose()
      createAlert( {
        icon: "success",
        text: resp.msg
      })
    } else {
      loaderAlertClose()
      createAlert( {
        icon: "error",
        text: resp.msg
      })
    }
  }catch(error) {
    loaderAlertClose()
    createAlert({
      icon:"error",
      text:error.message
    })
  }
})


// ADD GENRE AND DISPLAY FUNCTION

window.deleteAGenre = function (nm){
  if(!nm || !typeof(nm) === "string") return false
  const index = Genre_list.findIndex(g=>g===nm)
  Genre_list.splice(index,1)
  renderGenreList()
}

function renderGenreList(){
  Genre_section.innerHTML = ""
  Genre_list.forEach((genre)=>{
    const li = document.createElement("li")
    li.innerText = genre
    li.setAttribute("onclick",`deleteAGenre('${genre}')`)
    Genre_section.appendChild(li)
  })
}
function add_genre(name) {
  if (!Genre_list.includes(name) && name !== "") {
    Genre_list.push(name)
    renderGenreList()
  }
}
genre_select.addEventListener("change", ()=> {
  add_genre(genre_select.value)
})

// end

// Diwnload link adder
export function deleteLink(url){
  if(!url && !typeof(url)=== "string") return false
  const index = DownloadLinkList.findIndex(obj => obj.url === url)
  DownloadLinkList.splice(index,1)
  renderDownloadLinks()
}
function renderDownloadLinks(){
  const download_table = document.querySelector("#download_tbl")
  download_table.innerHTML = ""
  
  DownloadLinkList.forEach((obj)=>{
    const tr = document.createElement("tr")
    const td1 = document.createElement("td")
    td1.innerHTML = `
    <a href="${obj.url}">Download</a>
    `
    const td2 = document.createElement("td")
    td2.innerHTML = obj.quality
    const td3 = document.createElement("td")
    td3.innerHTML = obj.language
    const td4 = document.createElement("td")
    td4.innerHTML = obj.size
    const td5 = document.createElement("td")
    td5.innerHTML = `<button onclick="deleteLink('${obj.url}')" type="button" >Delete</button>`
    
    tr.append(td1, td2, td3, td4, td5)
    download_table.appendChild(tr)
  })
  
}
function handleDownloadLink() {
  
  const url = document.querySelector("#download_url").value
  const language = document.querySelector("#download_language").value
  const size = document.querySelector("#download_size").value
  const quality = document.querySelector("#download_quality").value

  const obj = {
    url: url ? url: null,
    language: language ? language: "....",
    size: size ? size+"mb": "..?mb",
    quality: quality ? quality+"p": "?p"
  }
  if (obj.url) {
    
    if (DownloadLinkList.length > 0) {
      if (!DownloadLinkList.some((o)=> o.url.includes(obj.url))) {
        DownloadLinkList.push(obj)
        renderDownloadLinks()
      }
    } else {
      DownloadLinkList.push(obj)
      renderDownloadLinks()
    }
  } else {
    createAlert( {
      icon: "error",
      text: "Please ad a download url."
    })
  }
}
document.querySelector("#add_download_link").addEventListener("click", handleDownloadLink)
// end





// ___________Add images section start
const imagesFileInput = document.querySelector("#images_file_input")
const imagesInput = document.querySelector("#image_input")
const addedImageBox = document.querySelector("#added_images")
const addImageBtn = document.querySelector("#add_img_btn")
// upload image
imagesFileInput.addEventListener("change", async (e)=>{
  try{
    createLoaderAlert()
    const formData = new FormData()
    formData.append("image",e.target.files[0])
    let response = await fetch(`${server_url}/upload-image`,{
      method: "POST",
      body:formData
    })
    response = await response.json()
    loaderAlertClose()
    if(response && response.isOk){
      ImagesList.unshift(response.url)
      uploadRecordIds.push(response.recordId && response.recordId)
      // const img = document.createElement("img")
      // img.src = response.url
      // addedImageBox.appendChild(img)
      renderImages()
      console.log(ImagesList)
      console.log(uploadRecordIds)
    }
    
  }catch(error){
    loaderAlertClose()
    createAlert({
      icon:"error",
      text:error.message
    })
  }
  
})
addImageBtn.addEventListener("click",()=>{
  if(imagesInput.value && imagesInput.value.includes("http")){
    ImagesList.unshift(imagesInput.value)
    renderImages()
  }
})
// function addImageUrl(){
//   if(imagesInput.value && imagesInput.value.includes("http")){
//     ImagesList.push(imagesInput.value)
//     const img = document.createElement("img")
//     img.src = imagesInput.value
//     const div = document.createElement("div")
//     div.classList.add("image_aria")
//     div.innerHTML = `<i class="fa-solid fa-minus"></i>`
//     div.appendChild(img)
//     addedImageBox.appendChild(div)
//   }
// }
function renderImages(){
  addedImageBox.innerHTML = ""
  ImagesList.forEach((img_url)=>{
    const img = document.createElement("img")
    img.src = img_url
    const div = document.createElement("div")
    div.classList.add("image_aria")
    div.innerHTML = `<i class="fa-solid fa-minus"></i>`
    div.appendChild(img)
    addedImageBox.appendChild(div)
  })
}
// delete image FUNCTIONALITY
addedImageBox.addEventListener("click",(e=>deleteAImage(e)))
function deleteAImage(e){
  const isDeleteBtn = e.target.className.includes("fa-minus") ? true : false
  if(isDeleteBtn){
    const image_url = e.target.nextElementSibling.src
    const index = ImagesList.findIndex(i=>i===image_url)
    ImagesList.splice(index,1)
    renderImages()
  }
}
// _______________Add images section end




// POSSTER FUNCTIONALITY START
const posterInput = document.querySelector("#poster_url_input")
const posterFile = document.querySelector("#poster_file_input")
const posterAddBtn = document.querySelector("#add_poster_btn")
const posterPrevew = document.querySelector("#poster_previw")
posterFile.addEventListener("change", async (e)=>{
  try{
    createLoaderAlert() // start lodding
    
    if(tempPosterId){
      const index = uploadRecordIds.findIndex((id)=> id === tempPosterId )
      uploadRecordIds.splice(index,1)
    }
    
    const formData = new FormData()
    formData.append("image",e.target.files[0])
    let response = await fetch(`${server_url}/upload-image`,{
      method: "POST",
      body:formData
    })
    response = await response.json()
    loaderAlertClose()
    if(response && response.isOk){
      Poster = response.url
      tempPosterId = response.recordId
      uploadRecordIds.push(response.recordId && response.recordId)
      posterPrevew.innerHTML = `<img src="${response.url}">`
      console.log(tempPosterId)
      console.log(uploadRecordIds)
      console.log(Poster)
    }else{
      createAlert({
        icon: "error",
        text: "Upload faild."
      })
    }
    
  }catch(error){
    loaderAlertClose() // colose lodding
    createAlert({
      icon: "error",
      text: error.message
    })
  }
})
posterAddBtn.addEventListener("click",()=>{
  if(posterInput.value){
    Poster = posterInput.value;
    posterPrevew.innerHTML = `<img src="${posterInput.value}">`
  }
})
// POSSTER FUNCTIONALITY END


// GETTING AKD RENDARING SELECT OPTION DATA 
async function getOptionData(){
  try{
    createLoaderAlert()
    let response = await fetch(`${server_url}/aditional`)
    response = await response.json()
    loaderAlertClose()
    if(response && response.isOk){
      renderOptionHtml(response.data)
    }else{
      createAlert({
        icon:"error",
        text:"Cant get please try again."
      })
    }
    
  }catch(err){
    createAlert({
      icon:"error",
      text:err.message
    })
  }
}
getOptionData()
// import required elements
const CategorySelectBox = document.querySelector('select[name="Category"]')
const TypeSelectBox = document.querySelector('select[name="Type"]')
const GenreSelectBox = document.querySelector('#chose_genre_section')


function renderOptionHtml(optData){
  if (!optData && !typeof(optData) === "object" ) return false
  const {Category,Type,Genre} = optData
  if(Category){
    let html = '<option value="">Chose Category</option>'
    Category.forEach((c)=>{
      html += `<option value="${c}" >${c}</option>`
    })
    CategorySelectBox.innerHTML= html
  }
  
  if(Type){
    let html = '<option value="">Chose Type</option>'
    Type.forEach((c)=>{
      html += `<option value="${c}" >${c}</option>`
    })
    TypeSelectBox.innerHTML= html
  }
  
  if(Genre){
    let html = '<option value="">Chose Genre</option>'
    Genre.forEach((c)=>{
      html += `<option value="${c}" >${c}</option>`
    })
    GenreSelectBox.innerHTML= html
  }
}

// END