import "./Styles/ContentHome.css"
import LoddingEffect from "./Assets/lodding1.gif"
import errorEffect from "./Assets/error.gif"
import {useEffect, useState} from "react"
import { useNavigate, Link } from "react-router-dom"

function ContentHome({ content_list, content_type, page, expand }){
  const Navigate = useNavigate()
  
  page = !page ? 1 : Number(page)
  const prevPage = page > 1 ? page-1 : page
  const nextPage = page+1
  
  const contentHtml = <div className="content_list">
        {
          content_list.slice( page*12-12, page*12 ).map((content,i)=>{
            return(
              <div key={i} onClick={()=>Navigate(`/${content_type}/${content.url_name}`,{state:content})} className="content">
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
        {!expand && <Link className="seemore" to={`/${content_type}/page/2`}>See More</Link> }
        {contentHtml}
        
        {/* PAGENATION SECTION */}
        {
          expand && <div className="pageination">
            <div onClick={()=>Navigate(`/${content_type}/page/${prevPage}`)} >Back</div>
            <div onClick={()=>Navigate(`/${content_type}/page/${nextPage}`)} >Next</div>
          
        </div>
        }
        {/* PAGENATION SECTION */}
        
        
      </div>
    </>
    )
}
export default ContentHome