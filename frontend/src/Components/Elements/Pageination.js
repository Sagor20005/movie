import "./Pageination.css"
export default function Pageination({ pages, nextPage, previousPage }){
  return(
    <div className="pageination_component">
      <button onClick={previousPage} >Back</button>
      <p>{pages.current} of {pages.max} pages</p>
      <button onClick={nextPage} >Next</button>
    </div>
    )
}