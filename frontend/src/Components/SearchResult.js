import "./Styles/SearchResult.css"
import { useSelector } from "react-redux"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux"
import { hideSearchComponent } from "../features/search/searchSlice"
import loddingGif from "./Assets/lodding1.gif"
import errorGif from "./Assets/error.gif"
import SeparateContentAreay from "../Utilities/separateProductAreay.js"
import movieIcon from "./Assets/movie.png"
import {usePageination} from "../hooks/usePageination.js"
import Pageination from "./Elements/Pageination.js"

function SearchResult(){
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  // Get Search result
  const { isLodding, isError, contents } = useSelector((state)=> state.search )
  // Pageination Hooks
  const { startEnd, nextPage, previousPage, pages } = usePageination("searchResult",contents.length,10,0)
  
  const currentPageContrnt = contents.slice( startEnd.start, startEnd.end )
  
  // Defain html genaretor
  let contentHtml = ""
  
  if(!isLodding && !isError && contents.length > 0){
    
    contentHtml =(
    <div className="src_res_con_list" >
      {
        currentPageContrnt.map((content)=>{
          return(
          <div onClick={()=>Navigate("/movie/"+content.url_name)} className="content">
            <div className="image">
              <img src={content.Poster} onError={(e)=> {
                    e.target.onerror = null;
                    e.target.src = movieIcon
                  }} alt={content.Title}/>
            </div>
            <div className="dtl">
              <span>{ content.Title.length > 20 ? content.Title.slice(0,15) + ".." : content.Title }</span>
              <span>{content.Released}</span>
            </div>
          </div>
          )
        })
      }
    </div>
    )
    
  }else if(!isLodding && !isError && contents.length === 0){
    contentHtml = <img className="lodding" src={errorGif} alt="lodding" />
  }else if(isLodding){
    contentHtml = <img style={{width:"100%",height:"auto"}} className="lodding" src={loddingGif} alt="lodding" />
  }else if(!isLodding && isError){
    contentHtml = <img className="lodding" src={errorGif} alt="lodding" />
  }
  
    
  
  
  
  function closeResult(){
    dispatch(hideSearchComponent())
  }
  
  
  return(
    <div className="src_res_containar">
      <span className="section_title">Search Result.</span>
      <FontAwesomeIcon onClick={closeResult} title="Close search result." className="close_result_btn" icon={faXmark} />
      {contentHtml}
      
      <Pageination pages={pages} nextPage={nextPage} previousPage={previousPage} />
      
    </div>
    )
}
export default SearchResult