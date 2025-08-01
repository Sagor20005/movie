import "./Styles/Home.css"
import ContentHome from "./ContentHome"
import SearchResult from "./SearchResult"
import Featured from "./Featured"
import Trending from "./Trending"
import { useSelector, useDispatch } from "react-redux"
import { Helmet } from 'react-helmet-async';
import { GetSettings } from "../features/settings/settingSlice"
import { getTrending } from "../features/Trending/TrendingSlice"
import { getForyou } from "../features/foryou/foryou.js"
import { getContents } from "../features/allContent/allContentSlice.js"
import { getFeatured } from "../features/Featured/FeaturedSlice"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useScrollToTop from "./CastomHooks/useScrollToTop.js"


function Home({content_type,expand}){
  const dispatch = useDispatch()
  const { pnum } = useParams()
  
  const { searchComponent } = useSelector((state)=> state.search)
  const { settings } = useSelector((state)=> state.setting)
  const { contents: TrendingContents } = useSelector((state)=> state.trending)
  const { contents: foryou_contents } = useSelector((state)=> state.foryou)
  const { contents: all_content } = useSelector((state)=> state.all_content)
  
  // Foryou Movies or sries what to render
  const moviesList = expand ? all_content.filter((content)=> content.Type === "movie" ) : foryou_contents.filter((content)=> content.Type === "movie" )
  const seriesList = expand ? all_content.filter((content)=> content.Type === "series" ) : foryou_contents.filter((content)=> content.Type === "series" )
  //Foryou  Movies or sries what to render
  
  // Extract Trending Contents
  const trending_movies = TrendingContents.filter((content)=> content.Type === "movie" )
  const trending_series = TrendingContents.filter((content)=> content.Type === "series" )
  // Extract Trending Contents
  
  
  useScrollToTop()
  useEffect(()=>{
    if(!settings) dispatch(GetSettings())
    if(TrendingContents.length === 0) dispatch(getTrending())
    if(foryou_contents.length === 0) dispatch(getForyou())
    if(all_content.length === 0) dispatch(getContents())
    dispatch(getFeatured())
  },[])
  
  
  return(
    <>
      <div className="home_body">
        <Helmet>
          <title>{settings?.Site_name ? settings.Site_name : "NewFlix"} | Home</title>
          <meta name="description" content="Download latest movies & series in hd quality. Bangla, Bollywood, Hollywood, South Indian movies download. Fast & Free!"/>
          <meta name="keywords" content="newflex,bangla movie download, movie download, bollywood movie download, hollywood movie download, HD movies, south indian movies, free movies"/>
        </Helmet>
        
        <div className="side" style={{
          gridArea:"l"
        }}>
          <Featured />
          <Trending trending_contents={content_type === "movie" ? trending_movies : trending_series } content_type={content_type} />
          { searchComponent ? <SearchResult /> : <ContentHome content_list={ content_type === "movie" ? moviesList : seriesList } content_type={content_type} page={pnum} expand={expand} /> }
        </div>
        <div className="side" style={{
          gridArea:"r"
        }}>
          <Trending trending_contents={content_type === "movie" ? trending_series : trending_movies } content_type={content_type === "movie" ? "series" : "movie"} />
          <ContentHome content_list={content_type === "movie" ? seriesList : moviesList } content_type={content_type === "movie" ? "series" : "movie"} />
        </div>
      </div>
      
    </>
    )
}
export default Home