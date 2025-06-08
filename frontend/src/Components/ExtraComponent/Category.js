import "./Styles/Category.css"
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { GetBySearch } from "../../features/search/searchSlice"
import { CategoryComponentHide } from "../../features/settings/settingSlice"

function Category(){
  
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { data } = useSelector((state)=> state.aditionalData )
  
  function handleLiClick(e,type){
    if(e.target.nodeName === "LI"){
      dispatch(GetBySearch({
        searchBy: type,
        query: e.target.innerText.toLowerCase()
      }))
      dispatch(CategoryComponentHide())
      Navigate("/")
    }
  }
  
  
  return(
    <div className="category_component">
     {/* <div className="categorys_div">
        <h4>categorys</h4>
        <ul onClick={ (e)=> handleLiClick(e,"Category") } className="categorys">
          {
            data?.Category && data?.Category?.map((cat,index)=>{
              return <li key={index} >{cat}</li>
            })
          }
        </ul>
      </div> */}
      <div className="genres_div" >
        <h4>genres</h4>
        <ul onClick={ (e)=> handleLiClick(e,"Genre") } className="genres">
          {
            data?.Genre && data?.Genre?.map((g,index)=>{
              return <li key={index}>{g}</li>
            })
          }
        </ul>
      </div>
        
    </div>
    )
}
export default Category