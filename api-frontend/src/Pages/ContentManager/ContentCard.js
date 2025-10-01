import {useState} from "react"
import ContentDetelsPopop from "./ContentDetelsPopop.js"
import DateTime from "../../Utilities/DateTime.js"

export default function ContentCard({poster,title,passed_time,id,index}){
  const [isOpen,setIsOpen] = useState(false)
  
  const Moment = DateTime(passed_time)
  
  return(
    <div key={crypto.randomUUID()} onClick={()=>{
      setIsOpen(true)
    }} className=" h-[80px] flex gap-2 rounded shadow p-2">
      <img className="w-[50px] rounded" src={poster} alt="error" />
      <div className="flex flex-col gap-1">
        <p>{title}</p>
        <p className="text-xs">{Moment}</p>
      </div>
    <ContentDetelsPopop index={index} content_id={id} open={isOpen} setIsOpen={setIsOpen} />
    </div>
    )
}