import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import MaltiInputFild from "../Elements/MultiTextFild.js"
import Button from "../Elements/Button.js"
import Lodding from "../Elements/Lodding.js"

export default function AditionalDataManager(){
  const aditionalType_list = {
    Genre:"text",
    Type:"text",
    Category:"text"
  }
  
  const Api = process.env.REACT_APP_API_URL
  
  async function Alert( oparetion, icon="warning" ){
    const alertRes = await Swal.fire({
      title: "Are you sure?",
      text: `What do you want to ${oparetion}!`,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    })
    return alertRes.isConfirmed
  }
  
  // AditiinalData state 
  const [ aditionalData, setAditionalData ] = useState({})
  const [ aditional,setAditional ] = useState({ fild:"Genre", data:"" })
  
  // FIRST TIME LOAD
  useEffect(()=>{
    
    async function GetAditiinalData(){
      try{
        let response = await fetch(Api+"/aditional")
        response = await response.json()
        if(response.isOk){
          setAditionalData(response.data)
          return
        }
        Swal.fire(response.msg)
      }catch(err){Swal.fire(err.message)}
    }
    GetAditiinalData()
    
  },[])
  
  
  async function SaveAditional(){
    if(!Api || !aditional.data) return
    const isConfrom = await Alert(`Add "${aditional.data}"`)
    if(!isConfrom) return
    
    try{
      let response = await fetch(Api+"/aditional",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(aditional)
      })
      response = await response.json()
      if(response.isOk){
        Swal.fire("Saved!")
        setAditionalData((prev)=>{
          return {
            ...prev, [aditional.fild]:[ ...prev[aditional.fild], aditional.data ]
          }
        })
        setAditional({ fild:"Genre", data:"" })
      }
    }catch(err){Swal.fire(err.message)}
  }
  
  
  // Delete an Data 
  async function DeleteAn(fild,data){
    if(!Api || !fild || !data) return
    const isConfrom = await Alert(`Delete "${data}"`)
    if(!isConfrom) return
    
    try{
      let response = await fetch(Api+"/aditional",{
        method:"DELETE",
        headers:{ "content-type":"application/json" },
        body: JSON.stringify({fild,data})
      })
      response = await response.json()
      if(response.isOk){
        setAditionalData((prev)=>{
          return {
            ...prev,
            [fild]: [...prev[fild].filter((f)=> f !== data ) ]
          }
        })
      }
    }catch(err){Swal.fire(err.message)}
  }
  
  
  if(!aditionalData.Genre) return (
    <div className="h-[100dvh] flex justify-center items-center">
      <Lodding size="big" />
    </div>
    )
    
  return(
    <div className="p-3">
      
      {/*Add An aditionalData*/}
      <div className="flex gap-1 justify-between overflow-hidden rounded-md shadow-md ">
        <select className="outline-none" onChange={(e)=>setAditional((prev)=>({...prev,fild:e.target.value}))} value={aditional.fild} >
          <option value="Genre">Genre</option>
          <option value="Type">Type</option>
          <option value="Category">Category</option>
        </select>
        <input className="outline-none" placeholder={`Write ${aditional.fild}`} onChange={(e)=>setAditional(prev=>({...prev,data:e.target.value}))} value={aditional.data} type="text" />
        <Button onClick={SaveAditional} text="Add" />
      </div>
      
      
      
      {/*GENRE SECTION*/}
      <div className="my-3">
        <h3 className="text-blue-400 font-bold text-2xl text-center">Genre</h3>
        <ul className="flex flex-wrap gap-1 justify-center">
          {aditionalData?.Genre?.map((gen)=> (<li onClick={()=>DeleteAn("Genre",gen)} className="p-2 rounded shadow" key={gen}>{gen}</li>) )}
        </ul>
      </div>
      {/*CATEGORY SECTION*/}
      <div className="my-3">
        <h3 className="text-blue-400 font-bold text-2xl text-center">Category</h3>
        <ul className="flex flex-wrap gap-1 justify-center">
          {aditionalData?.Category?.map((cat)=> (<li onClick={()=>DeleteAn("Category",cat)} className="p-2 rounded shadow" key={cat}>{cat}</li>) )}
        </ul>
      </div>
      {/*Type SECTION*/}
      <div className="my-3">
        <h3 className="text-blue-400 font-bold text-2xl text-center">Type</h3>
        <ul className="flex flex-wrap gap-1 justify-center">
          {aditionalData?.Type?.map((typ)=> (<li onClick={()=>DeleteAn("Type",typ)} className="p-2 rounded shadow" key={typ}>{typ}</li>) )}
        </ul>
      </div>
      
    </div>
    )
}