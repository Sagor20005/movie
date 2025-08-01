import "./Styles/Featured.css"
import { useSelector } from 'react-redux'
import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Featured = ()=>{
  const Navigate = useNavigate()
  
  const ScrollElements = useRef(null)
  const contentElements = useRef(null)
  let ScrolledWidth = 0; // Tracking scroll width
  
  
  // get data from redux storr
  let FeaturedContents = useSelector((state)=> state.featured.contents)
   const isEmpty = FeaturedContents.length <= 1 ? true : false
  // console.log(FeaturedContents)
  FeaturedContents = isEmpty ? [{},{},{},{},{}] : FeaturedContents
  
  
  useEffect(()=>{
    
    // SCROLL EFFECT FUNCTIONALIRY SECTION
    const scrollInterval = setInterval(() => {
      if (ScrollElements.current) {
        ScrollElements.current.scrollBy({ left: contentElements.current?.clientWidth, behavior: 'smooth' });
        // Tracking varuable update
        ScrolledWidth += contentElements.current?.clientWidth

        // যদি শেষ পর্যন্ত পৌঁছে যায়, তখন আবার শুরু থেকে
        if (
          ScrolledWidth + contentElements.current?.clientWidth >=
          ScrollElements.current.scrollWidth
        ) {
          ScrolledWidth = 0 // Reset tracking
          ScrollElements.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 3000); // প্রতি ৩ সেকেন্ডে স্ক্রল
    // SCROLL EFFECT FUNCTIONALIRY SECTION
    
    
    return () => clearInterval(scrollInterval);
  },[])
  
  
  
  return(
    <div ref={ScrollElements} className="Featured_component">
      {
        FeaturedContents?.map((content)=>{
          return(
          <div onClick={()=> Navigate(`/${content?.Type || "movie"}/${content?.url_name}`)} ref={contentElements} key={content?._id} className={`f_con ${isEmpty ? "empty_f_con" : ""}`} >
            {
              content._id ? <img src={content.Images[0] } alt={content?.Title}/> : null
            }
            <div className="c_info">
              <p>{content?.Title}</p>
              <small>{content?.Released}</small>
            </div>
          </div>
          )
        })
      }
    </div>
    );
};
export default Featured;