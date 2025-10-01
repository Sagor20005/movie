export default function Input({ name, text, onChange, value }){
  return(
    <div className="flex justify-between items-center px-3 py-2 rounded-md shadow-md">
      <p>{text}</p>
      <input 
      className="outline-none"
      type="text" onChange={(e)=>onChange(name,e.target.value)} value={value} />
    </div>
    )
}