import {
  createAlert,
  createLoaderAlert,
  loaderAlertClose,
  isConfromAlert
} from "../lib/alert.js"

// Elements import
const addAditionalForm = document.querySelector("#aditional_form")

// IMPORTANT VARUABLES
const server_url = window.location.protocol+"//"+window.location.host

// add a Option
addAditionalForm.addEventListener("submit", async (e)=> {
  e.preventDefault()
  try {
    if (e.target.data.value && e.target.fild.value && e.target.data.value.length > 3 && e.target.fild.value.length > 2) {
      const formData = new FormData(e.target)
      let response = await fetch(`${server_url}/aditional`, {
        method: "post",
        body: formData
      })
      response = await response.json()
      if (response && response.isOk) {
        window.location.reload()
      } else {
        createAlert( {
          icon: "error",
          text: response.msg
        })
      }

    } else {
      createAlert( {
        icon: "error",
        text: "Please fill the form!"
      })
    }
  }catch(err) {
    createAlert( {
      icon: "error",
      text: err.message
    })
  }
})


// __________GET ALL OPTION DATA AND RENDER THAT
// GET ALL SAVED DATA
async function GetAditionalData () {
  try {
    let response = await fetch(`${server_url}/aditional`)
    response = await response.json()
    if (response && response.isOk) RenderOptionData(response.data)
  }catch(err) {
    console.log(error)
  }
}
GetAditionalData()

// RENDER DATA
const CategorySection = document.querySelector("#category_list")
const TypeSection = document.querySelector("#type_list")
const GenreSection = document.querySelector("#genre_list")
function RenderOptionData(dataObj) {
  if (!dataObj) return false
  const {
    Category,
    Type,
    Genre
  } = dataObj

  //Render Category
  if (Category) {
    let html = ""
    Category.forEach((c)=> {
      html += `<li>${c}</li>`
    })
    CategorySection.innerHTML = html
  }

  // Render types
  if (Type) {
    let html = ""
    Type.forEach((c)=> {
      html += `<li>${c}</li>`
    })
    TypeSection.innerHTML = html
  }
  // Render Grnre
  if (Genre) {
    let html = ""
    Genre.forEach((c)=> {
      html += `<li>${c}</li>`
    })
    GenreSection.innerHTML = html
  }
}
//__________________________ END





// ______________WRITE DELETE FUNCTIONALITY

// add addEventListener
CategorySection.addEventListener("click", (e)=>DeleteRequest(e, "Category"))
TypeSection.addEventListener("click", (e)=>DeleteRequest(e, "Type"))
GenreSection.addEventListener("click", (e)=>DeleteRequest(e, "Genre"))

// if click option currect then request to server
async function DeleteRequest(e, fildName) {
  try {



    if (!e && !fildName) return false
    if (e.target.nodeName === "LI") {


      isConfromAlert( {
        icon: "",
        title: "Are you sure!",
        text: "what are you want to delete " + `"${e.target.innerText}" ?`
      }, async (res)=> {
        if (res) {
          let response = await fetch(server_url+"/aditional", {
            method: "delete",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              fild: fildName, data: e.target.innerText.toLowerCase()
            })
          })
          response = await response.json()
          if (response && response.isOk) {
            window.location.reload()
          } else {
            createAlert( {
              icon: "error",
              text: response.msg
            })
          }
        }
      })

    }
  }catch(err) {
    createAlert( {
      icon: "error",
      text: err.message
    })
  }
}
// ___________________________END