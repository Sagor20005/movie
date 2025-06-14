import {useParams, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
function DownloadStart(){
  const params = useParams()
  const Navigate = useNavigate()
  
  const server = `${process.env.REACT_APP_API_URL}/getlinkbyid`
  
  const [message,setMsg] = useState("")
  
  
  async function getContentUrl(id,link_id){
    try{
      let response = await fetch(server+"/"+id+"/"+link_id)
      if(!response.ok) window.close()
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
    url.then((url)=>{
      window.open(url,"_blank")
    })
  }
  
  useEffect(()=>{
    Dowloading(getContentUrl(params.id,params.linkid))
  },[])
  
  return(
    <>
      <h1 style={{margin: "30px"}} >{message}</h1>
    </>
    )
}
export default DownloadStart