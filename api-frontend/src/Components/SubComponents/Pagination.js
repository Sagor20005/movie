export default function Pagination({ page_info, setPage_info }){
  console.log(page_info)
  function ClickHandle(type){
    if(type === "back" && page_info.numbar > 0){
      setPage_info((prev)=>{return{...prev,numbar:page_info.numbar-1}})
      console.log("back")
    }else if(type === "next" && page_info.numbar < page_info.max){
      setPage_info((prev)=>{return{...prev,numbar:page_info.numbar+1}})
      console.log("next")
    }
  }
  
  return(
    <div className="flex justify-center items-center gap-4 my-2">
      <button onClick={()=>ClickHandle("back")} className="bg-red-900 text-white rounded px-1.5 py-2 hover:scale-95 transition-transform">Prev</button>
      <p>{page_info.numbar} page of {page_info.max}</p>
      <button onClick={()=>ClickHandle("next")} className="bg-red-900 text-white rounded px-1.5 py-2 hover:scale-95 transition-transform">Next</button>
    </div>
    )
}