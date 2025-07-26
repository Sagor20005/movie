import "./Styles/NewUpdate.css"
import React,{ useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ErrorGif from "./Assets/error.gif"
import { useSelector, useDispatch } from 'react-redux'
import { getContents } from "../features/allContent/allContentSlice.js"
// import useGetAutoShow from "../CastomHooks/useGetAutoShow"

function NewUpdate({Genre,content_type}){
  const dispatch = useDispatch();
  const Navigate = useNavigate()
  const { contents: all_contents } = useSelector((state)=> state.all_content)
  
  
  
  function findRelated(genre,data,max,count=1){
    if(count > genre.length){
      return data.slice(0,max)
    }
    const newData = data.filter((c)=>{
      let match = 0
      for(let i = 0; i < genre.length; i++){
        const currentGenre = genre[i];
        if(c.Genre.includes(currentGenre)){
          match++;
          if(match>= count) break;
        }
      }
      return match >= count
    })
    
   const returnedData = findRelated(genre,newData,max,count+1)
    if(returnedData.length <= 3){
      return newData.slice(0,max)
    }else{
      return returnedData
    }
  }
  
  
  
  
  // What to rendar 
  let [Html_content,setHtml] = useState(null)
  
  function render(data){
    if(data.length > 0){
   const Html = data.map((con,i)=>{
      if(con.New){
        return(
        <div key={i} onClick={()=>Navigate(`/${content_type}/${con.Title}`)} className="list_con">
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
    if(all_contents.length === 0) dispatch(getContents())
    const related = Genre ? findRelated(Genre,all_contents,10,1) : [] ;
    render(related)
  },[all_contents,Genre])
  
  
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