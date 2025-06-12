import "./Styles/Content.css"
import Navbar from "./Navbar"
import NewUpdate from "./NewUpdate"
import { useNavigate, useParams } from "react-router-dom"
import {useEffect,useState} from "react"
import { Helmet } from 'react-helmet-async';

function Content(){
  const api_url = process.env.REACT_APP_API_URL
  const [contentData,setCdata] = useState({})
  const Navigate = useNavigate()
  const {title} = useParams()
  
  async function fetchContent(title){
    try{
      let response = await fetch(`${api_url}/movie-by-title/${title.toLowerCase()}`)
      response = await response.json()
      console.log(response)
      if(response && response.isOk){
        setCdata(response.data)
      }
    }catch(err){
      console.log(err)
    }
  }
  
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Optional, adds smooth scrolling
    });
    // Call to get content
     fetchContent(title)
  },[])
  
  return(
    <>
      <Navbar />
      <div className="content_body">
        <Helmet>
          <title>{contentData?.Title}</title>
          <meta name="description" content={ `${contentData?.Title} ${ contentData?.Type || "" } download free. without login & signup. first download no ads!` } />
          <meta name="keywords" content={`${contentData?.Title} ${ contentData?.Type || "" } download, bangla movie download, hindi movie download`} />
        </Helmet>
        <div className="s_content_containar">
        
        {/* Top box */}
        <div className="top_box">
          <div className="bannar">
            <img src={contentData?.Poster} alt={contentData?.Title}/>
          </div>
          <div className="moreDtl">
            <p>{contentData?.Title}</p>
            <div className="aditional_dtl">
              <span>{contentData?.Released}</span>
              <span>{contentData?.Year}</span>
              <span>{contentData?.Country}</span>
              <span>{contentData?.Runtime}{contentData?.Runtime && "⏱️"}</span>
              <span>{contentData?.Genre?.join(", ")}</span>
              <span>{contentData?.Type}</span>
            </div>
          </div>
        </div>
        
        
        <div className="movi_doc_containar">
          <div className="navigation_btns">
            <button>Information</button>
            <button>Trailer</button>
          </div>
          
          <h3>Cast</h3>
          <p> <b>Actors:</b> {contentData?.Actors}</p>
          <p> <b>Writer:</b> {contentData?.Writer}</p>
          <p> <b>Director:</b> {contentData?.Director}</p>
        
          <h3>Plot</h3>
          <p>
            {contentData?.Plot}
          </p>
          
          <h3>IMDB Ratting</h3>
          <p>Metascore: {contentData?.Metascore}+</p>
          <p>imdbRating: {contentData?.imdbRating}+</p>
          <p>imdbVotes: {contentData?.imdbVotes}+</p>
          <p>imdbID: {contentData?.imdbID}</p>
          
          <div className="extra_images_containar">
            <h3>Images</h3>
            <div className="extra_images">
              {
                contentData?.Images?.map((img)=>{
                  return <img key={img} src={img} alt="ss"/>
                })
              }
            </div>
          </div>
          
        </div>
        
        
        <h3>Download links</h3>
        <table className="download_table">
          <thead>
            <tr>
            <th>Download</th>
            <th>Quality</th>
            <th>Language</th>
            <th>Size</th>
          </tr>
          </thead>
         
          <tbody>
            {
            contentData?.Downloads?.map((link)=>{
              return(
              <tr key={link._id}>
                <td><button onClick={()=>Navigate(`/download/${contentData._id}`)} >Download</button></td>
                <td>{link.quality}</td>
                <td>{link.language}</td>
                <td>{link.size}</td>
              </tr>
              )
            })
          }
          </tbody>
          
        </table>
        
      </div>
        <NewUpdate />
      </div>
    </>
    )
}
export default Content