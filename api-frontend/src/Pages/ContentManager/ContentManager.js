import { useContext, useState, useEffect } from "react"
import { MainContext } from "../../context/MainStateContext.js"
import ContentManageFilter from "./ContentManageFilter.js"
import FilteredContents from "./FilteredContents.js"
import Pagination from "../Elements/Pageination.js"
import { usePageination } from "../../hooks/usePageination.js"

export default function ContentManager(){
  const [{contents}] = useContext(MainContext)
  const [filter,setFilter] = useState(()=>()=>{})
  const FilteredData = contents.filter(filter)
  
  const { startEnd, pages, nextPage, previousPage, JumpPage } = usePageination("contentManager",FilteredData.length,5)
  
  const ApplyPageination = FilteredData.slice(startEnd.start,startEnd.end)
  
  
  
  return(
    <div className="h-full">
      <ContentManageFilter JumpPage={JumpPage} founded={FilteredData.length} total={contents.length}  setFilter={setFilter} />
      <FilteredContents contents={ApplyPageination} />
      <Pagination pages={pages} nextPage={nextPage} previousPage={previousPage} />
    </div>
    )
}