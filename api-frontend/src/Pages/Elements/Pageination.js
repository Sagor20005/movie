export default function Pageination({ pages, nextPage, previousPage }){
  return(
    <div className="flex justify-center items-center gap-[30px] my-[40px]">
      <button className="hover:bg-white hover:text-black py-[5px] px-[10px] rounded-md bg-red-900 text-white font-bold border-none text-[18px]" onClick={previousPage} >Back</button>
      <p>{pages.current} of {pages.max} pages</p>
      <button className="hover:bg-white hover:text-black py-[5px] px-[10px] rounded-md bg-red-900 text-white font-bold border-none text-[18px]" onClick={nextPage} >Next</button>
    </div>
    )
}