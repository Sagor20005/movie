import MultiTextFild from "./MultiTextFild.js"
import { Link } from "react-router-dom"

export default function DownloadSection({state,Data,Download,setDownload,setContent,content}){
  const Fild_config = {
    url:"text",
    language:"text",
    quality:"text",
    size:"text",
    title:"text"
  }
  
  function HandleSubmit(e){
    e.preventDefault()
    setContent((previous)=>{
      return {...previous, Downloads: [...previous.Downloads, Download] }
    })
    setDownload({ url:"", language:"", quality:"", size:"", title:"All" })
  }
  
  return(
    <div className="my-10 relative">
      
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
            Data.map(({url,language,quality,size,title})=>{
              return(
              <tr>
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
        <MultiTextFild Fild_config={Fild_config} state={state} />
      </form>
    </div>
    )
}