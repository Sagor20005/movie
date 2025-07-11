import "./Styles/Home.css"
import ContentHome from "./ContentHome"
import SearchResult from "./SearchResult"
import Tranding from "./Tranding"
import Trending from "./Trending"
import NewUpdate from "./NewUpdate"
import Category from "./ExtraComponent/Category"
import { useSelector, useDispatch } from "react-redux"
import { Helmet } from 'react-helmet-async';
import { GetSettings } from "../features/settings/settingSlice"
import { getTrending } from "../features/Trending/TrendingSlice"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LoddingEffect from "./Assets/lodding1.gif"


function Home({content_type,expand}){
  const dispatch = useDispatch()
  const { pnum } = useParams()
  
  const { searchComponent } = useSelector((state)=> state.search)
  const { settings } = useSelector((state)=> state.setting)
  const { contents: TrendingContents } = useSelector((state)=> state.trending)
  const { contents } = useSelector((state)=> state.moviesList)
  
  // Movies or sries what to render
  let content_list = []
  if(content_type){
    content_list = contents.filter((content)=> content.Type === content_type )
  }else{
    content_list = contents.filter((content)=> content.Type === "movie" )
  }
  // Movies or sries what to render
  
  // Extract Trending Contents
  const trending_movies = TrendingContents.filter((content)=> content.Type === "movie" )
  const trending_series = TrendingContents.filter((content)=> content.Type === "series" )
  console.log({trending_movies,trending_series})
  // Extract Trending Contents
  
  
  useEffect(()=>{
    if(!settings) dispatch(GetSettings())
    dispatch(getTrending())
  },[])
  
  
  return(
    <>
      <div className="home_body">
        <Helmet>
          <title>{settings?.Site_name ? settings.Site_name : "NewFlix"} | Home</title>
          <meta name="description" content="Download latest movies & series in hd quality. Bangla, Bollywood, Hollywood, South Indian movies download. Fast & Free!"/>
          <meta name="keywords" content="newflex,bangla movie download, movie download, bollywood movie download, hollywood movie download, HD movies, south indian movies, free movies"/>
        </Helmet>
        
        <div>
          <Tranding />
          <Trending trending_contents={content_type === "movie" ? trending_movies : trending_series } content_type={content_type} />
          { searchComponent ? <SearchResult /> : <ContentHome content_list={content_list} content_type={content_type} page={pnum} expand={expand} /> }
        </div>
        <Trending trending_contents={content_type === "movie" ? trending_series : trending_movies } content_type={content_type === "movie" ? "series" : "movie"} />
        <NewUpdate />
        <Category />
      </div>
      
    </>
    )
}
export default Home