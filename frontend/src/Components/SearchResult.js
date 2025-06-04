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

function SearchResult(){
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  
  const [ pageIndex, setIndex ] = useState(0)
  
  const { isLodding, isError, contents } = useSelector((state)=> state.search )
  const separatedContent = SeparateContentAreay(contents)
  
  // Defain html genaretor
  let contentHtml = ""
  
  if(!isLodding && !isError && contents.length > 0){
    
    contentHtml =(
    <div className="src_res_con_list" >
      {
        separatedContent[pageIndex].map((content)=>{
          return(
          <div onClick={()=>Navigate("/content",{ state:content })} className="content">
            <div className="image">
              <img src={content.Poster} alt={content.Title}/>
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
  function handlePageination(e){
    if(e.nodeName === "LI"){
      setIndex(e.innerText-1)
    }
  }
  
  
  return(
    <div className="src_res_containar">
      <span className="section_title">Search Result.</span>
      <FontAwesomeIcon onClick={closeResult} title="Close search result." className="close_result_btn" icon={faXmark} />
      {contentHtml}
      
      {
          
          contents.length > 0 && <ul onClick={(e)=>handlePageination(e.target)} className="page_list">
          {
            (function(){
              const elarr = []
              for (let i = 1; i <= separatedContent.length; i++){
                elarr.push(<li>{i}</li>)
              }
              return elarr
            })()
          }
        </ul>
          
        }
      
    </div>
    )
}
export default SearchResult