import { useUploadImage } from "../../../hooks/useUploadImage.js"
import Button from "../../Elements/Button.js"

export default function ImagesComponent({ state }){
  const [content,setContent] = state
  
  async function PestUrl(){
    const url = await navigator.clipboard.readText()
    if(url){
      setContent((previous)=>({...previous,Images:[...previous.Images,url]}))
    }
  }
  async function InputChange(e){
    // Get All Image upload Response from UseImageUpload
    const FilesRes = await useUploadImage(e.target.files)
    
    // Update Content State {Images,UploadedImageIds}
     setContent((pre)=>{
       return {
         ...pre,
         Images: [...pre.Images,...FilesRes.map((res)=>res.url)],
         UploadedImageIds: [...pre.UploadedImageIds, ...FilesRes.map((res)=>({ url:res.url, id:res.recordId }))]
       }
     })
  }
  
  function HandleDelete(url){
    setContent((prev)=>({ ...prev, 
      Images:[ ...prev.Images.filter((prev_url)=> prev_url !== url ) ],
      UploadedImageIds: [...prev.UploadedImageIds.filter((item)=>{
        if(typeof(item) === "string"){
          return true
        }
        return item.url !== url
      })]
    }))
  }
  function MakeBanner(url){
    setContent((prev)=>({ ...prev, Banner:url }))
  }
  
  return(
    <div>
      <h3 className="text-2xl text-center">Images</h3>
      <div className="grid grid-cols-2 gap-4">
      
      {
        content.Images.map((url)=>(
        <div className="group h-[110px] rounded-md shadow-md relative bg-amber-100 overflow-hidden">
          <img className="rounded-md h-full w-full object-cover object-center" src={url} alt="img" />
          <div className="group-hover:top-0 transition-all rounded bg-[#0000008f] absolute -top-[150%] left-0 z-10">
            <Button onClick={()=>HandleDelete(url)} text="Delete" />
            <Button onClick={()=>MakeBanner(url)} text="Make As Poster" />
          </div>
          {url === content.Banner && <p className="bg-[#ece7e78f] text-xs p-1 rounded shadow border-2 absolute bottom-1 right-1">Banner</p>}
        </div>
        ))
      }
      
      
      
      
      <div className="min-h-[100px] rounded-md shadow-md flex justify-around gap-3 items-center bg-amber-100">
        <label htmlFor="image_input">
          <img className="rounded-md bg-white h-[50px] w-[50px] p-1 rounded" src="/icons/select.png" alt="select"/>
        </label>
        <input onChange={(e)=>InputChange(e)} multiple id="image_input" className="h-0 w-0 fixed invisible" type="file" />
        <img onClick={PestUrl} className="rounded-md bg-white h-[50px] w-[50px] p-1 rounded" src="/icons/copy.png" alt="copy"/>
      </div>
    
    </div>
    </div>
    )
}