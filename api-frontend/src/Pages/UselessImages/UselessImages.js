import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import Button from "../Elements/Button.js"
import Lodding from "../Elements/Lodding.js"

export default function UselessImages(){
  const Api = process.env.REACT_APP_API_URL
  
  // All State
  const [images,setImages] = useState([])
  const [isLodding,setIsLodding] = useState(true)
  
  // First load Functionality 
  useEffect(()=>{
    // Get Useless images 
    async function GetImages(){
      if(!Api){
        setIsLodding(false)
        return
      }
      
      try{
        let response = await fetch(Api+"/unwanted_image");
        response = await response.json()
        setIsLodding(false) // Lodding false
        if(response.isOk){
          setImages(response.data)
        }
      }catch(err){
        Swal.fire(err.message)
        setIsLodding(false) // isLodding false
      }
    }
    
    // Function calling calling
    GetImages()
  },[])
  
  
  // DELETE USELESS IMAGES 
  async function DeleteAll(){
    if(!Api || !images.length) return 
    try{
      let result = await fetch(Api+"/unwanted_image",{
        method:"DELETE",
        headers:{ "content-type":"application/json" },
        body:JSON.stringify({data:images})
      })
      result = await result.json()
      if(result.isOk){
        Swal.fire("Deleted!")
        setImages([])
        return
      }
      Swal.fire(result.msg) // Alert Error
    }catch(err){Swal.fire(err.message)}
  }
  
  function CenterOverlay({children}){
    return (
      <div className="h-full flex justify-center items-center">
        {children}
      </div>
      )
  }
  
  // Lodding Effect 
  if(isLodding) return <CenterOverlay> <Lodding size="mid" /> </CenterOverlay>
  
  // Data Fulfiled State
  return(
    <div className="p-3 overflow-y-scroll h-dvh">
      {/*TITEL BAR AND DELETE BUTTON*/} 
      <div className="flex justify-between items-center">
        <h3 className="text-2xl">UselessImages</h3>
        <Button onClick={DeleteAll} text="DeleteAll" />
      </div>
      
      {/*EMPTY STATE || NOT FOUND*/}
      <CenterOverlay>
        <h3 className="text-xl">You Have 0 usless images!</h3>
      </CenterOverlay>
      
      {/*Images*/}
      <div className="flex gap-2 flex-wrap my-4">
        {
          images.map((image)=>{
            return <img className="w-[100px] rounded-md shadow-md" key={image._id} src={image.url} alt={image._id} />
          })
        }
      </div>
      
    </div>
    )
}