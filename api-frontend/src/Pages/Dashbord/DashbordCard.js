import Lodding from "../Elements/Lodding.js"
import { useRef, useEffect } from "react"

export default function DashbordCard({name,value}){
  
  const Count = useRef(null)
  
  async function Incries(element,start,end,speed){
    for(let current = start; current <= end; current++){
      await new Promise((resolve)=> setTimeout(()=>resolve(),speed) )
      element.current.innerText = current
    }
  }
  
  function StartCount(){
    if(!value || !Count.current) return
    Incries(Count,0,value,10)
  }
  useEffect(()=>{
    StartCount()
  },[value])

  
  return(
    <div className="hover:scale-105 transition shadow-md rounded-2xl p-3 flex flex-col items-center text-center gap-1">
      {
        !!value ? <h1 ref={Count} className="text-4xl text-blue-900 font-extrabold">0</h1> :
        <Lodding size="small" />
      }
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-red-300">At present {value} Items showen on {name}.</p>
    </div>
    )
}