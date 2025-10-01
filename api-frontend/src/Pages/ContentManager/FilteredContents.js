import Lodding from "../Elements/Lodding.js"
import ContentCard from "./ContentCard.js"

export default function FilteredContents({contents}){
  
  if(!contents.length) return (
    <div className="h-[470px] flex justify-center items-center">
      <Lodding size="mid" />
    </div>
    )
  
  return(
    <div className="h-[470px]">
      <div className=" p-2 grid md:grid-cols- gap-2">
      {
        contents.map(({Title,Poster,_id,createdAt},index)=>{
          return(
          <ContentCard 
            poster={Poster}
            title={Title}
            passed_time={createdAt}
            id={_id}
            index={index}
          />
          )
        })
      }
    </div>
    </div>
    )
}