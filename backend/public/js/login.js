// document.cookie = `token=jakar12345; max-age=${1000*60};`
// document.cookie = `tkn2=jakar12345; max-age=${1000*60};`


// ___________ELEMENTS IMPORTS SECTION START
const login_form = document.querySelector("#login_form")
// ___________ELEMENTS IMPORTS SECTION END


//  __________SUBMIT LOGIN FORM SECTION START
login_form.addEventListener("submit",async function(e){
  e.preventDefault()
  const formData = new FormData(this)
  try{
    let response = await fetch("/admin/login",{
      method:"post",
      body:formData
    })
    response = await response.json()
    console.log(response)
    if(response && response.isOk){
      document.cookie = `npxtkn=${response.token}; max-age=${1000*60*60};`
      window.open("/admin")
    }
  }catch(err){
    console.log(err)
  }
})
//  __________SUBMIT LOGIN FORM SECTION END