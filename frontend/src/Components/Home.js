import "./Styles/Home.css"
import ContentHome from "./ContentHome"
import SearchResult from "./SearchResult"
import Tranding from "./Tranding"
import NewUpdate from "./NewUpdate"
import Category from "./ExtraComponent/Category"
import { useSelector, useDispatch } from "react-redux"
import { Helmet } from 'react-helmet-async';
import { GetSettings } from "../features/settings/settingSlice"
import { useEffect } from "react"
import LoddingEffect from "./Assets/lodding1.gif"


function Home(){
  const dispatch = useDispatch()
  
  const { searchComponent } = useSelector((state)=> state.search)
  const { settings } = useSelector((state)=> state.setting)
  
  useEffect(()=>{
    dispatch(GetSettings())
  },[])
  
  
  return(
    <>
      <div className="home_body">
        <Helmet>
          <title>MovieFlex | Home</title>
        </Helmet>
        
        {
          !settings.Colors && <div className="home_overly">
          <img src={LoddingEffect} alt="lodding" />
        </div>
        }
        
        <div>
          <Tranding />
          { searchComponent ? <SearchResult /> : <ContentHome /> }
        </div>
        <NewUpdate />
        <Category />
      </div>
      
    </>
    )
}
export default Home