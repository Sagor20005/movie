import Select from "./Select.js"
import { useState, useEffect } from "react"

export default function ContentManageFilter({setFilter,founded,total}){
  const [filterObj,setFilterObj] = useState({ type:"movie", status:"Trand" })
  const Status_config = {
    Trending:"Trand",
    Foryou:"AutoShow",
    Featured:"Featured"
  }
  const type_config={
    Movie:"movie",
    Series:"series"
  }
  
  
  useEffect(()=>{
    setFilter(()=>(data)=> data.Type === filterObj.type && data[filterObj.status] === true)
  },[filterObj])
  
  
  return(
    <form 
    onSubmit={(e)=>e.preventDefault()}
    className="p-2 rounded-xl shadow-md m-2.5 bg-[#e9e8f0]">
      <div className="flex gap-1 my-3">
        <Select onChange={(e)=>setFilterObj((prev)=> {return {...prev,type:e.target.value}} )} value={filterObj.type} id="type" label="Type" name="Type" options={type_config} />
        <Select onChange={(e)=>setFilterObj((prev)=> {return {...prev,status:e.target.value}} )} value={filterObj.status} id="status" label="Status" name="status" options={Status_config} />
        <p className="inline-block py-2 px-1 ml-2 rounded shadow">Founded {founded} of {total}</p>
      </div>
    </form>
    )
}