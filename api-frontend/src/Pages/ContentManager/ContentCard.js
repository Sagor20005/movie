import {useState} from "react"
import ContentDetelsPopop from "./ContentDetelsPopop.js"

export default function ContentCard({poster,title,passed_time,id,index}){
  const [isOpen,setIsOpen] = useState(false)
  return(
    <div key={crypto.randomUUID()} onClick={()=>{
      setIsOpen(true)
    }} className="hover:scale-95 transition max-h-[80px] flex gap-2 rounded shadow p-2">
      <img className="w-[50px] rounded" src={poster} alt="error" />
      <div className="flex flex-col gap-1">
        <p>{title}</p>
        <p className="text-xs">{passed_time}</p>
      </div>
    <ContentDetelsPopop index={index} content_id={id} open={isOpen} setIsOpen={setIsOpen} />
    </div>
    )
}