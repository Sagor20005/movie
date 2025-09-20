import { useContext } from "react"
import DashbordCard from "./SubComponents/DashbordCard.js"
import { MainContext } from "../context/MainStateContext.js"

export default function Dashbord(){
  
  const [{contents},setContentList] = useContext(MainContext)
  
  
  
  if(!contents) return <h1 className="text-2xl text-center mt-[300px] block">Lodding...</h1>
  
  return(
      <div className="grid grid-cols-2 gap-4 p-3">
        <DashbordCard name="Trending" value="20" />
        <DashbordCard name="Featured" value="11" />
        <DashbordCard name="Foryou" value="12" />
        <DashbordCard name="DeleteAble" value="5" />
      </div>
    )
}