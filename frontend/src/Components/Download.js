import "./Styles/Download.css"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
function Download(){
  const params = useParams()
  const Navigate = useNavigate()
  
  const [ count, setCount ] = useState(0)
  
  setTimeout(()=>{
    if(count>0) setCount(count-1)
  },1000)
  
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Optional, adds smooth scrolling
    });
  },[])
  
  
  return(
    <>
      <div className="download_component">
        
        <div className="count_box">
          <h3>Please wait 10 secund.</h3>
          <h2>{count}</h2>
        </div>
        
        <div className="download_box">
          <h3>{count > 0 ? "Genarating Link." : "Rady to download."}</h3>
          <button > { count>0 ? "Please Wait." : <Link target="_blank" to={`/dstart/${params.id}/${params.linkid}`} >Download now.</Link> } </button>
        </div>
        
        <div className="dalert">
          <p>Open our website in any browser to avoid the problem of not entering the link.</p>
          <p>লিংকে ঢুকতে না পারা প্রবলেম এড়াতে ওয়েবসাইট টি যেকোনো ওয়েবসাইট খুলুন।</p>
        </div>
      </div>
    </>
    )
}
export default Download