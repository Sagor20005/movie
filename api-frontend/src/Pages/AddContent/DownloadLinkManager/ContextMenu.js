
export default function ContextMenu({ state, setContextMenu, content, setContent, setDownload }){
  const {pos_x,pos_y,_id} = state
  
  // HANDLE DELETE
  function DeleteDownload(id){
    setContent( prev => ({ ...prev, Downloads:[ ...prev.Downloads.filter(({_id})=> _id !== id ) ] }) )
    setContextMenu({})
  }
  
  //  HANDLE UPDATE BUTTON
  function HandleUpdate(){
    // Fill Download with this Download
    setDownload(content.Downloads.find((d)=>d._id === _id))
    // Delete This Download
    setContent((prev)=>({...prev,Downloads:[...prev.Downloads.filter((d)=>d._id!==_id)]}))
    // Set Empty Context Menu
    setContextMenu({})
  }
  
  if(!pos_x) return null // Rendaring Close
  return(
    <div style={{ left:`${pos_x}px`, top:`${pos_y}px` }} className="sticky inline-flex p-2 rounded shadow flex-col gap-2 bg-white text-black">
      <button onClick={HandleUpdate}  className="hover:font-bold shadow">Edit</button>
      <button onClick={()=>DeleteDownload(_id)} className="hover:font-bold shadow">Delete</button>
    </div>
    )
}