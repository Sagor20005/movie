import "./Styles/Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react"
import Category from "./ExtraComponent/Category"
import { useSelector, useDispatch } from "react-redux"
import { CategoryComponentShow, CategoryComponentHide, searchInputShow, searchInputHide } from "../features/settings/settingSlice"
import { GetBySearch } from "../features/search/searchSlice"
import { Link, useNavigate } from "react-router-dom"
import { getAditionalData } from "../features/aditionalData/aditionalDataSlice"
import { GetSettings } from "../features/settings/settingSlice"

function Navbar(){
  
  const Navigate = useNavigate()
  
  // subscribe redux store 
  const { showCategoryComponent, showSearchInput, settings } = useSelector((state)=>state.setting)
  const { data } = useSelector((state)=> state.aditionalData )
  
  const dispatch = useDispatch()
  
  const MenuHandler = ()=>{
    showCategoryComponent ? dispatch(CategoryComponentHide()) : dispatch(CategoryComponentShow())
  }
  const inputhHandler = ()=>{
    showSearchInput ? dispatch( searchInputHide() ) : dispatch( searchInputShow() )
  }
  
  function FormSubmit(e){
    e.preventDefault()
    const query = e.target.s.value ? e.target.s.value.toLowerCase().trim() : null 
    if(query){
      dispatch(GetBySearch({
        searchBy:"Title",
        query
      }))
      Navigate("/")
    }
  }
  
  useEffect(()=>{
    dispatch(getAditionalData())
    dispatch(GetSettings())
  },[])
  
  return(
    <>
      <header className="navbar">
        
        <div className="icons">
          <FontAwesomeIcon onClick={MenuHandler} icon={ showCategoryComponent ? faXmark : faBars } />
          <Link className="navLogo" to="/">{settings?.Site_url ? settings.Site_name : "NewFlix"}</Link>
          <form onSubmit={e=>FormSubmit(e)} className="search_box">
            <input name="s" className="search_input" type="search" placeholder="Search.." />
            <button>Search</button>
          </form>
          <FontAwesomeIcon className="src_btn" onClick={inputhHandler} icon={ showSearchInput ? faXmark  : faMagnifyingGlass} />
        </div>
        { showSearchInput && <form onSubmit={e=>FormSubmit(e)} className="search_box">
          <input name="s" className="search_input" type="search" placeholder="Search.." />
          <button>Search</button>
        </form> }
        { showCategoryComponent && <Category /> }
        
      </header>
    </>
    )
}
export default Navbar