
// HOW TO USE 

// [ CREATE A ALERT ]
// createAlert({
//   icon:"error",
//   text:"This is an error!"
// })

//[ CREATE AND CLOSE LOADER ]
// createLoaderAlert()
// loaderAlertClose()

// [ Is Confrom alert ]
// isConfromAlert({
//   icon:"info",
//   title:"are you sure!",
//   text:"are you agree this contract?"
// },(res)=>{
//   console.log(res)
// })




const body = document.querySelector("body")
const header = document.querySelector("head")

// assart 
const icons = {
  close: `<i class="fa-solid fa-xmark"></i>`,
  success:  `<i class="fa-solid fa-circle-check"></i>`,
  error: `<i class="fa-solid fa-bug"></i>`,
}
const fontOsomCdn = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />`
const googleFontCdn = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jersey+10&family=Rubik+Vinyl&family=Rubik:ital,wght@0,300..900;1,300..900&family=Sigmar&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet">`

// setup environment
header.innerHTML += fontOsomCdn + googleFontCdn
const alertRoot = document.createElement("div")
alertRoot.classList.add("alert_root")
body.appendChild(alertRoot)

const root = document.querySelector(".alert_root")

const css = `

.alert_root{
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column-reverse;
  gap: 10px;
  transition:all 1s;
}

.alert_containar {
    border-radius: 13px;
    min-height: 60px;
    background-color: #0b1012;
    min-width: 300px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas: "icon text text close";
    align-items: center;
    text-transform: capitalize;
    color: white;
    padding-inline: 10px;
    gap: 20px;
    text-align: center;
    font-family: "rubik";
    animation: openAnimate .5s ease-out;
    transition: .5s;
  }
  .alert_icon {
    grid-area: icon;
  }
  .alert_text {
    grid-area: text;
  }
  .alert_close {
    grid-area: close;
  }
  
  
  @keyframes openAnimate{
    from{
      opacity: 0;
      transform: translate(0%, -50%);
    }to{
      opacity: 1;
      transform: translate(0%, 0%);
    }
  }
  
  /*  CONFROM BOX CSS   */
 .conform_box{
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: #293d3c;
      display: flex;
      flex-direction: column;
      gap: 5px;
      justify-content: center;
      align-items: center;
      padding: 20px;
      border-radius: 13px;
      color: #cfd7e1;
      text-align: center;
      font-family: "Rubik";
      animation-name: open_confrom;
      animation-duration: .5s;
    }
    .confrom_btns{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
    .confrom_btns button{
      border: none;
      border-radius: 13px;
      padding: 5px 10px;
      font-family: "Rubik";
      transition: 1s;
    }
    .confrom_btns button:hover{
      background-color: red;
      color: white;
    }
    
    @keyframes open_confrom {
      0%{
        transform: translate(-50%, -50%) scale(.5);
      }100%{
        transform: translate(-50%, -50%) scale(1);
      }
    }
    
    /*LOADER ALERT SECTION*/
    .loaderAlertOverly{
      height: 100vh;
      width: 100vw;
      background-color: #2b111a4c;
      position: fixed;
      top: 0;
      left: 0;
      display: grid;
      place-items: center;
    }
    .alert_loder{
      display: flex;
      column-gap: 10px;
    }
    @scope(.alert_loder){
      div{
        height: 30px;
        width: 30px;
        border-radius: 50%;
      }
      .dot_1{
        animation: loder_animate 1s linear infinite;
      }
      .dot_2{
        animation: loder_animate 1s linear infinite;
        animation-delay: .3s;
      }
      .dot_3{
        animation: loder_animate 1s linear infinite;
        animation-delay: .5s;
      }
    }
    
    @keyframes loder_animate{
      0%{
        transform: scale(1);
        background-color: green;
      }
      50%{
        transform: scale(0.5);
        background-color: blue;
      }100%{
        transform: scale(1);
        background-color: green;
      }
    }

`

const style = document.createElement("style")
style.innerHTML = css;
header.appendChild(style)

function createAlert(data){
  let alertBox = document.createElement("div")
  let icon = document.createElement("span")
  let text = document.createElement("p")
  let closeBtn = document.createElement("span")
  
  // add attributes 
  alertBox.classList.add("alert_containar")
  icon.classList.add("alert_icon")
  text.classList.add("alert_text")
  closeBtn.classList.add("alert_close")
  
  // inject messages 
  icon.innerHTML = data.icon && icons[data.icon]
  text.innerHTML = data.text && data.text.split(",").join(" ")
  closeBtn.innerHTML = icons.close
  
  // inject element in alert box 
  alertBox.appendChild(icon)
  alertBox.appendChild(text)
  alertBox.appendChild(closeBtn)
  
  
  // impliment stage 
  root.appendChild(alertBox)
  
  // close button handler 
  closeBtn.addEventListener("click",()=>{
    alertBox.style.opacity = "0"
    alertBox.style.transform = "translate(0%,-50%)"
    setTimeout(()=>{
      alertBox.remove()
    },1000)
  })
  
  // Auto remove 
  setTimeout(()=>{
    alertBox.style.opacity = "0"
    alertBox.style.transform = "translate(0%,-50%)"
    setTimeout(()=>{
      alertBox.remove()
    },1000)
  },5000)
  
}

function isConfromAlert(data={},callback){
  const icon = typeof(data.icon) === "string" ? data.icon : "info";
  const title = typeof(data.title) === "string" ? data.title :"Are you Sure?";
  const text = typeof(data.text) === "string" ? data.text.split(",").join(" ") : "Are you sure for doing this";
  
  const confromBox = `
    <span>?</span>
    <span class="confrom_title">${title}</span>
    <p class="confrom_text">${text}</p>
    <div class="confrom_btns">
      <button class="alert_confrom">Okay</button>
      <button class="alert_cancel" >Cancel</button>
    </div>
  `
  
  
  const confromContainar = document.createElement("div")
  confromContainar.classList.add("conform_box")
  confromContainar.innerHTML = confromBox;
  body.appendChild(confromContainar)
  
  const confromBtn = document.querySelector(".alert_confrom")
  const cancelBtn = document.querySelector(".alert_cancel")
  
  const promise = new Promise((resolve,reject)=>{
    confromBtn.addEventListener("click",()=>{
      resolve(true)
    })
    cancelBtn.addEventListener("click",()=>{
      reject(false)
    })
  })
  
  promise.then((res)=> {
    confromContainar.remove()
    callback(res)
  })
  promise.catch((err)=>{
    confromContainar.remove()
    callback(err)
  })
  
}

// LODER ALERT FUNCTIONLITY
function createLoaderAlert(){
  const div = document.createElement("div")
  const loaderAlertOverly = document.createElement("div")
  loaderAlertOverly.classList.add("loaderAlertOverly")
  const html = `
  <div class="dot_1"></div>
  <div class="dot_2"></div>
  <div class="dot_3"></div>
  `
  div.classList.add("alert_loder")
  div.innerHTML = html
  loaderAlertOverly.appendChild(div)
  body.appendChild(loaderAlertOverly)
}
function loaderAlertClose(){
  try{
    const loader = document.querySelector(".loaderAlertOverly")
    if(loader){
      loader.remove()
    }else{
      console.log("not found loader..")
    }
  }catch(err){
    console.log(err)
  }
}






export {
  createAlert,
  createLoaderAlert,
  loaderAlertClose,
  isConfromAlert
}


