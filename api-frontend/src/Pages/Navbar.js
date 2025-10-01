import { NavLink } from "react-router-dom"
import { useState } from "react"

export default function Navbar(){
  const [isMenu,setIsMenu] = useState(false)
  
  function ActiveLinkHandler(e){
    if(e.isActive) {
      return "-translate-y-1 transition-transform text-[#4f4398] font-bold"
    }
    return ""
  }
  
  function CloseNavigation(){
    setIsMenu(false)
  }
  
  return(
    <header className="flex justify-between items-center px-3 md:px-5 py-3 shadow-md" >
      <h1 className="text-2xl font-bold capitalize">C-Panel</h1>
      <button onClick={()=> setIsMenu(!isMenu)} className="md:hidden text-xl shrink-0" ><i className={`fa-solid ${isMenu ? "fa-xmark" : "fa-bars"}`}></i></button>
      <nav className={`${isMenu ? "translate-x-0" : "-translate-x-[200%]"} transition-all flex gap-4 flex-col md:flex-row fixed z-40 md:static top-[70px] bg-[#9ff2e9] md:bg-transparent shadow-md md:shadow-none rounded-2xl md:rounded-none p-3 md:translate-x-0 `}>
        <NavLink onClick={CloseNavigation} className={(e)=>ActiveLinkHandler(e)} to="/">Dashbord</NavLink>
        <NavLink onClick={CloseNavigation} className={(e)=>ActiveLinkHandler(e)} to="/manage-content">Manage Content</NavLink>
        <NavLink onClick={CloseNavigation} className={(e)=>ActiveLinkHandler(e)} to="/setting">Setting</NavLink>
        <NavLink onClick={CloseNavigation} className={(e)=>ActiveLinkHandler(e)} to="/add">Add Content</NavLink>
        <NavLink onClick={CloseNavigation} className={(e)=>ActiveLinkHandler(e)} to="/aditional-data">AditionalData</NavLink>
        <NavLink onClick={CloseNavigation} className={(e)=>ActiveLinkHandler(e)} to="/uselessimages">Useless-Images</NavLink>
      </nav>
    </header>
    )
}