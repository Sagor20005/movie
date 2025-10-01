import { useContext } from "react"
import DashbordCard from "./DashbordCard.js"
import { MainContext } from "../../context/MainStateContext.js"

export default function Dashbord(){
  
  const [{contents},setContentList] = useContext(MainContext)
  
  function GetLength(data){
    const length = {Trending:0,Foryou:0,Featured:0}
    for(const anDta of data){
      if(anDta.Trand) length.Trending++
      if(anDta.AutoShow) length.Foryou++
      if(anDta.Featured) length.Featured++
    }
    return length
  }
  const DataLength = GetLength(contents)
  
  
  if(!contents) return <h1 className="text-2xl text-center mt-[300px] block">Lodding...</h1>
  
  return(
      <div className="grid grid-cols-2 gap-4 p-3">
        <DashbordCard name="Trending" value={DataLength.Trending} />
        <DashbordCard name="Featured" value={DataLength.Featured} />
        <DashbordCard name="Foryou" value={DataLength.Foryou} />
      </div>
    )
}