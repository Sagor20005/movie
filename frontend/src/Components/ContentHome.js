import "./Styles/ContentHome.css"
import { useNavigate, Link } from "react-router-dom"
import { usePageination } from "../hooks/usePageination.js"
import Pageination from "./Elements/Pageination.js"

function ContentHome({ content_list, content_type, page, expand }){
  const Navigate = useNavigate()
  
  
  const { startEnd, nextPage, previousPage, pages } = usePageination("contentHome",content_list.length,12,0)

  
  
  const contentHtml = <div className="content_list">
        {
          content_list.slice( !expand ? 0 : startEnd.start, !expand ? 12 : startEnd.end ).map((content,i)=>{
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
        {!expand && <Link className="seemore" to={`/${content_type}/page/1`}>See More</Link> }
        {contentHtml}
        
        {/* PAGENATION SECTION */}
         { expand && <Pageination pages={pages} nextPage={nextPage} previousPage={previousPage} /> }
        {/* PAGENATION SECTION */}
        
        
      </div>
    </>
    )
}
export default ContentHome