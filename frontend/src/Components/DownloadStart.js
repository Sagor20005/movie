import {useParams} from "react-router-dom"
import { useEffect, useState } from "react"
import "./Styles/DownloadStart.css"
import instructionImage from "./Assets/instruction.jpg"
function DownloadStart(){
  const params = useParams()
  
  const server = `${process.env.REACT_APP_API_URL}/getlinkbyid`
  
  const [message,setMsg] = useState("")
  
  
  async function getContentUrl(id,link_id){
    try{
      let response = await fetch(server+"/"+id+"/"+link_id)
      response = await response.json()
      if(response && response.isOk){
        setMsg("Download Started.")
        return response.data
      }else{
        setMsg("faild to download.")
      }
      
    }catch(err){
      setMsg("faild to download.")
    }
  }
  function Dowloading(url){
    url.then((data)=>{
      if (data) window.open(data,"_blank")
    })
  }
  
  useEffect(()=>{
    Dowloading(getContentUrl(params.id,params.linkid))
  },[])
  
  return(
    <>
     <div className="download_start_containar" >
       <h1 style={{margin: "30px"}} >{message}</h1>
       <img src={instructionImage} alt="helper" />
     </div>
    </>
    )
}
export default DownloadStart