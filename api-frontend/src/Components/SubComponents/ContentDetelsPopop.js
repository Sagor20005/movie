import { useState, useContext, useEffect } from "react"
import { MainContext } from "../../context/MainStateContext.js"
import RadioToggle from "./RadioToggle.js"
import Button from "../Elements/Button.js"
import {useNavigate} from "react-router-dom"

export default function ContentDetelsPopop({ open, setIsOpen, content_id }){
  const [emni,setEmni] = useState(null)
  const Navigate = useNavigate()
  
  const [{contents},setContentList] = useContext(MainContext)
  const currContent = contents.find((content)=> content._id === content_id)
  
  
  function ClosePopop(e){
    // Set Close Popop
    setIsOpen(false)
    // Stop Boobleing
    e.stopPropagation()
  }
  
  function UpdateStatus(Fild,Value){
    const Api = process.env.REACT_APP_API_URL
    return new Promise(async(resolve,reject)=>{
      let response = await fetch(Api+"/fildupdate",{
        method:"put",
        body:JSON.stringify({
          _id:content_id,
          Fild,Value
        }),
        headers:{
          "content-type":"application/json"
        }
      })
      response = await response.json()
      resolve(response)
    })
  }
  
  async function HandleClick(name,cb){
    
    const response = await UpdateStatus(name,!currContent[name])
    
    const Index = contents.findIndex((e)=> e._id===content_id)
    const content = contents[Index]
    content[name] = !content[name]
    const originalData = contents
    originalData.splice(Index,1,content)
    setContentList(originalData)
    setEmni(crypto.randomUUID())
    cb()
  }
  
  
  function DeleteContent(){
    
  }
  
  
  if(!open) return
  return(
    <div className="min-h-[200px] w-[300px] bg-[#e9e8f3] fixed top-32 left-[50%] -translate-x-[50%] rounded-2xl shadow-md p-3">
      <i onClick={(e)=>ClosePopop(e)} className="absolute top-5 right-5 fa-solid fa-xmark"></i>
      <h1 className="text-2xl text-center py-2">{currContent.Title}</h1>
      <RadioToggle onClick={HandleClick} name="Trand" isOn={currContent.Trand} />
      <RadioToggle onClick={HandleClick} name="Featured" isOn={currContent.Featured} />
      <RadioToggle onClick={HandleClick} name="AutoShow" isOn={currContent.AutoShow} />
      <Button onClick={DeleteContent} text="Delete" />
      <Button onClick={()=>Navigate("/add",{state:{id:content_id}})} text="Update" />
    </div>
    )
}