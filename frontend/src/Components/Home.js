import "./Styles/Home.css"
import ContentHome from "./ContentHome"
import SearchResult from "./SearchResult"
import Tranding from "./Tranding"
import NewUpdate from "./NewUpdate"
import Category from "./ExtraComponent/Category"
import { useSelector, useDispatch } from "react-redux"
import { Helmet } from 'react-helmet-async';
import { GetSettings } from "../features/settings/settingSlice"
import { useEffect, useState } from "react"
import LoddingEffect from "./Assets/lodding1.gif"


function Home(){
  const dispatch = useDispatch()
  
  const { searchComponent } = useSelector((state)=> state.search)
  const { settings } = useSelector((state)=> state.setting)
  
  const [loadAlert,setLoadAlert] = useState("")
  setTimeout(()=>{
    setLoadAlert(
      <div className="latxt">
        <p>Please wait for the first load to take a little time..</p>
        <p>প্রথম লোডে একটু সময় অপেক্ষা করুন করুন।</p>
      </div>
      )
  },2500)
  
  useEffect(()=>{
    if(!settings) dispatch(GetSettings())
  },[])
  
  
  return(
    <>
      <div className="home_body">
        <Helmet>
          <title>{settings?.Site_url ? settings.Site_name : "NewFlix"} | Home</title>
          <meta name="description" content="Download latest movies & series in hd quality. Bangla, Bollywood, Hollywood, South Indian movies download. Fast & Free!"/>
          <meta name="keywords" content="movie download, bollywood movie download, hollywood movie download, HD movies, south indian movies, free movies"/>
        </Helmet>
        
        {
          !settings.Colors && <div className="home_overly">
          {loadAlert}
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