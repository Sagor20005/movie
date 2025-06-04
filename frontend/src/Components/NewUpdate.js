import "./Styles/NewUpdate.css"
import React,{ useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ErrorGif from "./Assets/error.gif"
import { useSelector, useDispatch } from 'react-redux'
import { getMovies } from "../features/movies/moviesSlice"
// import useGetAutoShow from "../CastomHooks/useGetAutoShow"

function NewUpdate(){
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  
  const Contents = useSelector((state)=> state.moviesList)
  const { contents } = Contents
  useEffect(()=>{
    if(contents.length === 0) dispatch(getMovies())
  },[])
  
  // get data from redux storr
  const newContents = useSelector((state)=> state.moviesList.contents)
  
  // What to rendar 
  let [Html_content,setHtml] = useState(null)
  
  function render(){
    if(newContents.length > 0){
   const Html = newContents.map((con,i)=>{
      if(con.New){
        return(
        <div key={i} onClick={()=>Navigate("/content",{state:con})} className="list_con">
            <img src={con.Poster} alt={con.Title}/>
            <div>
              <p>{con.Title}</p>
              <p>{con.Year}</p>
              <p>&#9734; {con.imdbRating}</p>
            </div>
          </div>
        )
      }
      return null
    })
    setHtml(Html)
  }else{
    setHtml(
      <img className="component_state" src={ErrorGif} alt="error" />
      )
  }
  }
  
  useEffect(()=>{
    render()
  },[newContents])
  
  
  return(
    <>
      <div className="NewUpdate_section">
        <h3>New Update</h3>
        <div className="NewUpdate_list">
          
          {Html_content}
          
          
        </div>
      </div>
    </>
    )
}

export default NewUpdate