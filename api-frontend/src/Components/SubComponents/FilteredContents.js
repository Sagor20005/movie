
import ContentCard from "./ContentCard.js"

export default function FilteredContents({contents}){
  
  
  return(
    <div className="h-[470px]">
      <div className=" p-2 grid md:grid-cols- gap-2">
      {
        contents.map(({Title,Poster,_id})=>{
          return(
          <ContentCard 
            poster={Poster}
            title={Title}
            passed_time="2 days"
            id={_id}
          />
          )
        })
      }
    </div>
    </div>
    )
}