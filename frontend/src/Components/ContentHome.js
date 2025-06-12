import "./Styles/ContentHome.css"
import LoddingEffect from "./Assets/lodding1.gif"
import errorEffect from "./Assets/error.gif"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import SeparateProductAreay from "../Utilities/separateProductAreay.js"
import { useSelector, useDispatch } from 'react-redux'
import { getMovies } from "../features/movies/moviesSlice"


function ContentHome(){
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  
  // get data from redux storr
  const Contents = useSelector((state)=> state.moviesList)

  const { isLodding, isError, error, contents } = Contents
  
  useEffect(()=>{
    if(contents.length === 0) dispatch(getMovies())
  },[])
  
  // genarate html
  const [contentHtml,setHtml] = useState(null)
  function rendar(index){
    if(isLodding){
      setHtml(<img style={{width:"100%",height:"auto"}} className="lodding" src={LoddingEffect} alt="lodding"/>)
    }else if(!isLodding && !isError && contents.length === 0){
      setHtml(<img className="lodding" src={errorEffect} alt={error}/>)
    } else if(!isLodding && !isError && contents){
      let temp = <div className="content_list">
        {
          SeparateProductAreay(contents,12)[index].map((content,i)=>{
            return(
              <div key={i} onClick={()=>Navigate(`/content/${content.Title}`,{state:content})} className="content">
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
      setHtml(temp)
    }else if(!isLodding && isError){
      setHtml(<img className="lodding" src={errorEffect} alt={error}/>)
    }
  }
  
  useEffect(()=>{
    // function call
    rendar(0)
  },[contents,isLodding,isError])
  
  function handlePageination(e){
    if(e.nodeName === "LI"){
      rendar(e.innerText-1)
    }
  }
    
  
  
  
  return(
    
    
    
    <>
      <div className="content_containar" >
        <span className="section_title">Latest Contants.</span>
        {contentHtml}
        {
          
          contents.length > 0 && <ul onClick={(e)=>handlePageination(e.target)} className="page_list">
          {
            (function(){
              const elarr = []
              for (let i = 1; i <= SeparateProductAreay(contents).length; i++){
                elarr.push(<li key={i} >{i}</li>)
              }
              return elarr
            })()
          }
        </ul>
          
        }
      </div>
    </>
    )
}
export default ContentHome