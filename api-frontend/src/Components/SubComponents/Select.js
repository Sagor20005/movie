export default function Select({id,label,name,options,defaultValue,defaultText,onChange,value,state}){
  
  return(
    <div className="flex flex-col gap-1 shadow-md p-2 rounded-xl">
      <label htmlFor={id}>{label}</label>
      <select 
      value={value}
      onChange={(e)=>onChange(e)}
      className="bg-transparent border-[1px] border-black rounded p-1" id={id}>
        {
          defaultText && <option value={defaultValue}>{defaultText}</option>
        }
        {
          Array.isArray(options) ? options.map((opt)=> <option key={opt} value={opt}>{opt}</option>) : 
          Object.entries(options).map(([key,value])=><option key={value} value={value} >{key}</option>)
        }
      </select>
    </div>
    )
}