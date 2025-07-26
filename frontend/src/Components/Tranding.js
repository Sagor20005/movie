import "./Styles/Tranding.css"
import {useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

function Tranding(){
  const [domComplete,setDomComplete] = useState(false)
  const [mainHtml,setHtml] = useState(null)
  
  // get data from redux storr
  const TrandingCon = useSelector((state)=> state.foryou.contents)
  
  const Navigate = useNavigate()
  
  // Element ref
  const ScrollAbleEl = useRef(null)
  
  useEffect(()=>{
    if(!mainHtml) htmlGenaretor()
    if(domComplete) addAnimationCss(ScrollAbleEl.current.scrollWidth,ScrollAbleEl.current.children.length )
  },[domComplete,mainHtml,TrandingCon])
  
  // what to rendar 
  function addAnimationCss (fullWidth, contentCounts) {
  try {
    
    // setup animation 
    ScrollAbleEl.current.style.animation = `animatemove ${contentCounts*3}s infinite`
    
    let css = "@keyframes animatemove{"
    const parStep = fullWidth/contentCounts
    const parParcent = 95/(contentCounts-1)

    for (let i = 1; i <= contentCounts; i++) {
      css += `
      ${parParcent*i}%{
      transform: translateX(-${parStep*i}px);
      }
      `
    }
    css += `
    100%{
    transform: translateX(0);
    }
    `
    document.querySelector("#aditional_style").innerHTML += document.querySelector("#aditional_style").innerHTML.includes(css) ? "" : css
    
  }catch(err) {
    alert(err.message)
  }
}
  
  
  function htmlGenaretor(){
    let Html = null
  if(TrandingCon && TrandingCon.length > 0){
    Html = TrandingCon.map((con,i)=>{
      if(con.Trand){
        return(
          <div key={i} className="t_content">
            <img onClick={()=>Navigate("/content/"+con.url_name)} src={con.Images[0]} alt={con.Title}/>
            <div className="con_dtl">
              <p>{con.Title}</p>
              <p>{con.Released}</p>
            </div>
          </div>
          )
      }
    })
    setHtml(Html)
    setTimeout(()=>{
      setDomComplete(true)
    },1000)
  }
  }
  
  
  
  return(
    <>
      <div className="tranding_section">
        <div ref={ScrollAbleEl} className="scroll_containar">
           {mainHtml}
        </div>
       
      </div>
    </>
    )
}
export default Tranding