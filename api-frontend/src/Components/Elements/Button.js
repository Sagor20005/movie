export default function Button({text,onClick}){
  return <button onClick={onClick} className="min-w-[50px] px-1.5 py-2 rounded-md bg-red-900 text-white hover:scale-95 transition-transform inline-block m-1.5">{text}</button>
}