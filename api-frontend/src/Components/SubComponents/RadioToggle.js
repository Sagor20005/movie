import { useState } from "react"

export default function RadioToggle({name,isOn,onClick}){
  
  const [isLodding,setIsLodding] = useState(false)
  
  async function HandleClick(){
    setIsLodding(true)
    if(onClick){
      onClick(name,()=>setIsLodding(false))
    }
  }
  return(
    <div className="flex justify-between px-4 rounded-xl shadow-md p-2">
      <p>{name}</p>
      <div onClick={HandleClick} className="w-[40px] h-[23px] border-2 border-black rounded-xl py-0.5 relative">
        {
          !isLodding ? <div className={`${isOn ? "right-0.5" : "left-0.5"} absolute h-4 w-4 rounded-full bg-black`}></div> :
          <div className={`${isOn ? "right-0.5" : "left-0.5"} absolute h-4 w-4 rounded-full border-t-[1.5px] animate-spin border-black `}></div>
        }
      </div>
    </div>
    )
}