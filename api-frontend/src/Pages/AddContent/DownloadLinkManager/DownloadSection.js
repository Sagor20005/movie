import { Link } from "react-router-dom"
import MultiTextFild from "../../Elements/MultiTextFild.js"
import ContextMenu from "./ContextMenu.js"
import { useLocalStorage } from "../../../hooks/useLocalStorage.js"

export default function DownloadSection({state,Data,Download,setDownload,setContent,content}){
  // Multi fild Template
  const Fild_config = {
    title:"text",
    url:"text",
    language:"text",
    quality:"text",
    size:"text",
  }
  
  // ContextMenu State 
  const [contextMenu,setContextMenu] = useLocalStorage("DownloadContextMenu",{
    pos_x:0, pos_y:0, _id:""
  })
  
  // Submit Download 
  function HandleSubmit(e){
    e.preventDefault()
    setContent((previous)=>{
      return {...previous, Downloads: [...previous.Downloads, Download] }
    })
    setDownload({ url:"", language:"", quality:"", size:"", title:"",_id:crypto.randomUUID() })
  }
  
  // Open the Context Menu
  function OpenContextMenu(e,_id){
    e.preventDefault() // Disable Default 
    setContextMenu({pos_x:e.clientX, pos_y:e.clientY, _id})
  }
  
  return(
    <div className="my-10 relative">
      
      {/*Context Menu */}
      <ContextMenu setDownload={setDownload} content={content} setContent={setContent} state={contextMenu} setContextMenu={setContextMenu} />
      
      {/* Download Show Table*/}
      <table className="w-full shadow-md rounded-md text-center">
        <thead>
          <tr>
            <th className="text-center border-[1px] border-black">Ep</th>
            <th className="text-center border-[1px] border-black"><i className="fa-solid fa-download"></i></th>
            <th className="text-center border-[1px] border-black">Language</th>
            <th className="text-center border-[1px] border-black">Quality</th>
            <th className="text-center border-[1px] border-black">Size</th>
          </tr>
        </thead>
        <tbody>
          
          {
            Data.map(({_id,url,language,quality,size,title})=>{
              return(
              <tr onContextMenu={(e)=>OpenContextMenu(e,_id)} key={url}>
            <td className="p-1 border-[1px] border-black">{title}</td>
            <td className="p-1 border-[1px] border-black"><Link to={url}><i className="fa-solid fa-download"></i></Link></td>
            <td className="p-1 border-[1px] border-black">{language}</td>
            <td className="p-1 border-[1px] border-black">{quality}</td>
            <td className="p-1 border-[1px] border-black">{size}</td>
          </tr>
              )
            })
          }
          
          <tr>
            <td className="p-1 border-[1px] border-black">{Download.title}</td>
            <td className="p-1 border-[1px] border-black">{Download.url && <Link to={Download.url}><i className="fa-solid fa-download"></i></Link>}</td>
            <td className="p-1 border-[1px] border-black">{Download.language}</td>
            <td className="p-1 border-[1px] border-black">{Download.quality}</td>
            <td className="p-1 border-[1px] border-black">{Download.size}</td>
          </tr>
          
        </tbody>
      </table>
      
      {/*Add Download Functionality*/}
      <form onSubmit={(e)=>HandleSubmit(e)}>
        <MultiTextFild 
        onChange={(key,val)=>{
          setDownload((prev)=>{
            return {
              ...prev,[key]:val
            }
          })
        }}
        Fild_config={Fild_config} state={state} />
      </form>
    </div>
    )
}