import { useContext, useState, useEffect } from "react"
import { MainContext } from "../../context/MainStateContext.js"
import ContentManageFilter from "./ContentManageFilter.js"
import FilteredContents from "./FilteredContents.js"
import Pagination from "./Pagination.js"

export default function ContentManager(){
  const [{contents}] = useContext(MainContext)
  const [filter,setFilter] = useState(()=>()=>{})
  const FilteredData = contents.filter(filter)
  const [page_info,setPage_info] = useState({
    numbar:0,
    max:0,
    max_show:5
  })
  
  const ApplyPageination = FilteredData.slice(page_info.numbar*page_info.max_show, page_info.numbar*page_info.max_show+page_info.max_show)
  useEffect(()=>{
    setPage_info((p)=>{
      const divided = FilteredData.length /page_info.max_show
      const pageCount =Math.floor(divided)
      return{...p,max: pageCount,numbar:0 }
    })
  },[filter,contents])
  
  
  
  return(
    <div className="h-full">
      <ContentManageFilter founded={FilteredData.length} total={contents.length}  setFilter={setFilter} />
      <FilteredContents contents={ApplyPageination} />
      <Pagination page_info={page_info} setPage_info={setPage_info} />
    </div>
    )
}