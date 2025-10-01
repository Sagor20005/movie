export default function InputColor({ text, name, onChange, value  }){
  return(
    <div className="flex justify-between items-center px-3 py-2 rounded-md shadow-md">
      <p>{text}</p>
      <input
      className="w-[70px]"
      onChange={(e)=>onChange(name,e.target.value)}
      value={value}
      type="color" name={name} />
    </div>
    )
}