import {useParams} from "react-router-dom"
import { useEffect, useState } from "react"
function DownloadStart(){
  const params = useParams()
  
  const server = `${process.env.REACT_APP_API_URL}/getbyid`
  
  const [message,setMsg] = useState("")
  
  
  async function getContentUrl(id){
    try{
      let response = await fetch(server+"/"+id)
      if(!response.ok) return false
      response = await response.json()
      if(response && response.isOk){
        setMsg("Download Started.")
        return response.data.Downloads[0].url
      }else{
        setMsg("faild to download.")
        return null
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
    Dowloading(getContentUrl(params.id))
  },[])
  
  return(
    <>
      <h1 style={{margin: "30px"}} >{message}</h1>
    </>
    )
}
export default DownloadStart