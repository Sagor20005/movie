import Select from "./Select.js"
import { useContext } from "react"
import { MainContext } from "../../context/MainStateContext.js"

export default function GenreManager({state}){
  const [{aditionalData}] = useContext(MainContext)
  const genreList = aditionalData.Genre
  const [content,setContent] = state
  console.log(aditionalData,content)
  
  
  function HandleDelete(genre){
    setContent((previous)=>({ ...previous, Genre:[ ...previous.Genre.filter((oneGenre)=> oneGenre!==genre ) ] }))
  }
  
  
  if(!genreList.length) return null
  
  return(
    <div className="my-9">
      {/*Show Genre*/}
      <div>
        <ul>
          {
            content.Genre.map((g)=>{
              return(
                <li onClick={()=>HandleDelete(g)} key={g} className="inline-block p-1 rounded-md shadow-md m-2">{g}</li>
              )
            })
          }
        </ul>
      </div>
      {/*Create and update Genre*/}
      <Select onChange={(e)=>{ setContent((previous)=>{
        if(previous.Genre.includes(e.target.value)){
          return previous
        }
        return {...previous,Genre: [...previous.Genre, e.target.value]}
      }) }} value={content.Genre} id="genre" label="Genre" name="Genre" defaultValue="" defaultText="Choose an Genre" options={genreList} />
    </div>
    )
}