import Lodding from "../Elements/Lodding.js"

export default function DashbordCard({name,value}){
  
  
  return(
    <div className="hover:scale-105 transition shadow-md rounded-2xl p-3 flex flex-col items-center text-center gap-1">
      {
        !!value ? <h1 className="text-4xl text-green-400">{value}</h1> :
        <Lodding size="small" />
      }
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-red-300">At present {value} Items showen on {name}.</p>
    </div>
    )
}