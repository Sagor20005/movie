import "./Styles/Trending.css"
import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Trending = ({ trending_contents, content_type })=>{
  if (!trending_contents) trending_contents = [{},{}]
  
  const contents_element = useRef(null)
  const Navigate = useNavigate()
  
  
  
  useEffect(()=>{
    // SCROLL EFFECT FUNCTIONALIRY SECTION
    const scrollInterval = setInterval(() => {
      if (contents_element.current) {
        contents_element.current.scrollBy({ left: 150, behavior: 'smooth' });

        // যদি শেষ পর্যন্ত পৌঁছে যায়, তখন আবার শুরু থেকে
        if (
          contents_element.current.scrollLeft + contents_element.current.clientWidth >=
          contents_element.current.scrollWidth
        ) {
          contents_element.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 3000); // প্রতি ৩ সেকেন্ডে স্ক্রল
    // SCROLL EFFECT FUNCTIONALIRY SECTION
    
    
    return () => clearInterval(scrollInterval);
  },[])
  
  
  
  return(
    <div className="t_containar">
      <h3>Trending {content_type}</h3>
      <div ref={contents_element} className="t_contents">
        
        {
          trending_contents.map((content)=>{
          //console.log(content.Title.length > 20 ? content.Title.split(0,19) : content.Title)
            return(
              <div onClick={()=> Navigate("/"+content_type+"/"+content.url_name)} key={content?._id} className="t_content">
                <img src={content?.Poster} alt={content.Title} />
                <div className="t_data">
                  <p>{ content?.Title?.length >= 15 ? content?.Title?.slice(0,13) + ".." : content?.Title }</p>
                  <small>{content?.Year}</small>
                </div>
              </div>
            )
          })
        }
        
      </div>
    </div>
    );
};
export default Trending;