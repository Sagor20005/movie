import "./Styles/ContentHome.css"
import LoddingEffect from "./Assets/lodding1.gif"
import errorEffect from "./Assets/error.gif"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"

function ContentHome({ content_list, content_type, page }){
  const Navigate = useNavigate()
  
  if(!page) page = 1
  
  const contentHtml = <div className="content_list">
        {
          content_list.slice( page*10-10, page*20 ).map((content,i)=>{
            return(
              <div key={i} onClick={()=>Navigate(`/content/${content.url_name}`,{state:content})} className="content">
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

  
  return(
    
    
    
    <>
      <div className="content_containar" >
        <span className="section_title">Latest {content_type}.</span>
        {contentHtml}
      </div>
    </>
    )
}
export default ContentHome