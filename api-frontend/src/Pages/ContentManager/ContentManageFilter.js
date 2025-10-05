import Select from "../Elements/Select.js"
import { useEffect } from "react"
import {useLocalStorage} from "../../hooks/useLocalStorage.js"

export default function ContentManageFilter({setFilter,founded,total,JumpPage}){
  const [filterObj,setFilterObj] = useLocalStorage("filterObj",{ type:"movie", status:"Trand" })
  const Status_config = {
    Trending:"Trand",
    Foryou:"AutoShow",
    Featured:"Featured",
    All:"all"
  }
  const type_config={
    Movie:"movie",
    Series:"series",
    All:"all"
  }
  
  
  useEffect(()=>{
    // Set Filter Function CallBack Function 
      setFilter(()=>{
        // Return The CallBack Function 
        return function(data){
          return ( 
            // Type Chake 
            (filterObj.type  === "all" ? true : filterObj.type === data.Type) && 
            // Status Chake 
            (filterObj.status === "all" ? true : data[filterObj.status])
            )
        }
      })
      
      // Set Current Pageination page on 0
      JumpPage(0)
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