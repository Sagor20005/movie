import { useEffect, useState } from "react"
import Swal from "sweetalert2"

import { useLocalStorage } from "../../hooks/useLocalStorage.js"
import Theem from "./Theem.js"
import OtherInformation from "./OtharInformation.js"
import Button from "../Elements/Button.js"

export default function Setting(){
  // Setting State Var
  const [setting,setSetting] = useLocalStorage("setting",{})
  
  const [reset,setReset] = useState(Date.now())
  const [resetHelper,setHelper] = useState("")
  
  
  // Api Api
  const Api = process.env.REACT_APP_API_URL
  
  // First Time load Function 
  useEffect(()=>{
    
    // Get Setting On SERVER Function
    async function GetSetting(){
      if( Object.keys(setting).length && reset === resetHelper ) return // if Not Setting then Contunue
      if(!Api) return
      try{
       const req = await fetch(Api+"/settings");
       const resp = await req.json()
       if(resp.isOk){
         setSetting(resp.data)
       }
      }catch(err){Swal.fire(err.message)}
    }
    
    GetSetting()
    setHelper(reset)
  },[reset,Api])
  
  
  // Save Setting Function
  async function SaveSetting(){
    if(!setting || !Api) return 
    
    // Alert for Update 
    const alertRes = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Update this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!"
    })
    if(!alertRes.isConfirmed) return // If Close then End Function
    
    try{
      // Start fetch
      const req = await fetch(Api+"/settings",
      {
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(setting)
      }) // End fetch
      const res = await req.json() // Parse To json
      if(res.isOk){
        Swal.fire("Saved!") // Alert Success
        return
      }
      Swal.fire(res.msg) // Alert error
    }catch(err){Swal.fire(err.message)}
  } // End Saved
  
  
  function ResetSetting(){
    setReset(Date.now())
  }
  
  
  return(
    <div className="p-3">
      {/*Theem Section*/}
      <Theem setSetting={setSetting} Colors={setting.Colors} />
      {/*Other information*/}
      <OtherInformation setSetting={setSetting} setting={setting} />
      
      <Button onClick={SaveSetting} text="Save"/>
      <Button onClick={ResetSetting} text="Reset"/>
      
    </div>
    )
}