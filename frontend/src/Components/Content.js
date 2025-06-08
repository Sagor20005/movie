import "./Styles/Content.css"
import Navbar from "./Navbar"
import NewUpdate from "./NewUpdate"
import { useLocation, useNavigate } from "react-router-dom"
import {useEffect} from "react"
import { Helmet } from 'react-helmet-async';

function Content(){
  const { state } = useLocation()
  const Navigate = useNavigate()
  
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Optional, adds smooth scrolling
    });
  })
  
  return(
    <>
      <Navbar />
      <div className="content_body">
        <Helmet>
          <title>{state?.Title}</title>
        </Helmet>
        <div className="s_content_containar">
        
        {/* Top box */}
        <div className="top_box">
          <div className="bannar">
            <img src={state?.Poster} alt={state?.Title}/>
          </div>
          <div className="moreDtl">
            <p>{state?.Title}</p>
            <div className="aditional_dtl">
              <span>{state?.Released}</span>
              <span>{state?.Year}</span>
              <span>{state?.Country}</span>
              <span>{state?.Runtime}{state?.Runtime && "⏱️"}</span>
              <span>{state?.Genre.join(", ")}</span>
              <span>{state?.Type}</span>
            </div>
          </div>
        </div>
        
        
        <div className="movi_doc_containar">
          <div className="navigation_btns">
            <button>Information</button>
            <button>Trailer</button>
          </div>
          
          <h3>Cast</h3>
          <p> <b>Actors:</b> {state?.Actors}</p>
          <p> <b>Writer:</b> {state?.Writer}</p>
          <p> <b>Director:</b> {state?.Director}</p>
        
          <h3>Plot</h3>
          <p>
            {state?.Plot}
          </p>
          
          <h3>IMDB Ratting</h3>
          <p>Metascore: {state?.Metascore}+</p>
          <p>imdbRating: {state?.imdbRating}+</p>
          <p>imdbVotes: {state?.imdbVotes}+</p>
          <p>imdbID: {state?.imdbID}</p>
          
          <div className="extra_images_containar">
            <h3>Images</h3>
            <div className="extra_images">
              {
                state?.Images.map((img)=>{
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
            state?.Downloads.map((link)=>{
              return(
              <tr key={link._id}>
                <td><button onClick={()=>Navigate(`/download/${state._id}`)} >Download</button></td>
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