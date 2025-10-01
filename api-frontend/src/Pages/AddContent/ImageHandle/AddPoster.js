import { useState } from "react"
import { useUploadImage } from "../../../hooks/useUploadImage.js"

export default function AddPoster({ state }){
  const temp_poster = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbcB8CzP84p9DQiOBLSizDs3rqZTkCFgSESfvcRAHuQNqD32FOVquUR7U&s=10"
  const [select,setSelect] = useState(true)
  const [content,setContent] = state
  
  async function ClickHandler(){
    if(!select){
      const text = await navigator.clipboard.readText()
      setContent((prev)=>{return {...prev,Poster:text}})
    }
  }
  
  async function OnInputChange(e){
    
    // Get All upliaded Result
    const FilesRes = await useUploadImage(e.target.files)
    const response = FilesRes[0]
    
    // Update Content And set Nessesary State
    if(response && response.isOk){
      setContent((prev)=>({ ...prev, Poster:response.url, UploadedImageIds:[ ...prev.UploadedImageIds.filter((item)=> {if(typeof(item) === "string"){return true} return item.url !== prev.Poster} ) ,{ url:response.url,id:response.recordId }] }))
    }
  }
  
  return(
    <form className="p-3 shadow-md rounded-md flex items-center flex-col gap-4">
      <h3 className="text-2xl">Poster</h3>
      <div className="flex gap-4 rounded-md bg-blue-300 shadow-md p-2">
        <img onClick={()=>setSelect(true)} className={`${select ? "bg-white" : ""} w-5 rounded shadow-md p-1`} src="/icons/select.png" alt="select"/>
        <img onClick={()=>setSelect(false)} className={`${!select ? "bg-white" : ""}  w-5 rounded shadow-md p-1`} src="/icons/copy.png" alt="pest"/>
      </div>
      <label className="relative inline-block rounded-md shadow-md mt-3" htmlFor="choose_poster">
        <img className="w-[200px] rounded-md" src={`${content.Poster ? content.Poster : temp_poster}`} alt="poster" />
        <img onClick={ClickHandler} className="bg-white p-1.5 h-[30px] w-[30px] rounded-full absolute bottom-3 right-3" src={`${select ? "/icons/select.png" : "/icons/copy.png"}`} alt="ref" />
      </label>
      {select ? <input onChange={(e)=>OnInputChange(e)} className="invisible h-0 w-0 fixed" id="choose_poster" type="file" /> : null}
    </form>
    )
}