const headerNav = document.querySelector("#header nav")
const navMenuBtn = document.querySelector("#menu_bars")
const closeNavBtn = document.querySelector("#nav_xmark")

function toggleNav (){
  headerNav.classList.toggle("nav_show")
  navMenuBtn.classList.toggle("fa-bars")
  navMenuBtn.classList.toggle("fa-xmark")
}
navMenuBtn.addEventListener("click",toggleNav)
closeNavBtn.addEventListener("click",toggleNav)