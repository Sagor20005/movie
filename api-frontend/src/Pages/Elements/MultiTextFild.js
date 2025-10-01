import {useState} from "react"

export default function MultiTextFild({
  Fild_config,
  state,
  onChange
}){
  const [currFild,setCurrFild] = useState(Object.keys(Fild_config)[0])
  const [data] = state
  
  return(
    <div className="border-black border-[1px] rounded-md p-1 m-2 flex gap-2 capitalize">
      <select value={currFild} onChange={(e)=>setCurrFild(e.target.value)} className="border-[1px] p-1 rounded bg-transparent">
        {
          Object.keys(Fild_config).map((key)=> <option key={key} value={key}>{key}</option>)
        }
      </select>
      <input className="outline-0 capitalize" type={Fild_config[currFild]} name={currFild} value={data[currFild]} onChange={(e)=>onChange(currFild,e.target.value)} placeholder={currFild ? `Write ${currFild}` : "Choose an Option"}  />
      {/*<input className="outline-0 capitalize" type={Fild_config[currFild]} name={currFild} value={data[currFild]} onChange={(e)=>setData((prev)=>{return { ...prev, [currFild]:e.target.value }})} placeholder={currFild ? `Write ${currFild}` : "Choose an Option"}  />*/}
    </div>
    )
}