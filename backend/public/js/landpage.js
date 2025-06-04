const redirectLink = document.querySelector("#redirect")

async function GetAndPlaceUrl(){
  try{
    redirectLink.innerText = "..."
    let response = await fetch("/settings")
    response = await response.json()
    redirectLink.innerText = "Go to MovieFlex"
    if(response && response.isOk){
      redirectLink.href = response.data.Site_url
    }
  }catch(e){
    redirectLink.innerText = "Go to MovieFlex"
  }
}
GetAndPlaceUrl()