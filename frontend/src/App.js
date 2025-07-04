import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Components/Home"
import Content from "./Components/Content"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import Download from "./Components/Download"
import DownloadStart from "./Components/DownloadStart"
import { HelmetProvider } from 'react-helmet-async'
import { useSelector } from "react-redux"
import { useEffect } from "react"

function App() {
  const helmetContext = {};
  // Get setting
  const { settings } = useSelector((state)=> state.setting )
  
  
  function SetTheamColors(colors){
    // root element
    const root = document.documentElement
    
    // set varuable
    root.style.setProperty("--text",colors.text_color)
    root.style.setProperty("--title",colors.title_color)
    root.style.setProperty("--bg",colors.bg_color)
    root.style.setProperty("--link",colors.link_color)
    root.style.setProperty("--small_text",colors.small_text_color)
    root.style.setProperty("--logo",colors.logo_color)
    root.style.setProperty("--box_bg",colors.box_bg_color)
  }
  
  
  useEffect(()=>{
    if(settings && settings.Colors) SetTheamColors(settings.Colors)
  },[settings])
  
  
  
  return (
    <HelmetProvider context={helmetContext}>
      
      <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="App_body">
          <Routes>
            <Route path="/" element={<Home content_type="movie" />}/>
            <Route path="/movie" element={<Home content_type="movie" />}/>
            <Route path="/series" element={<Home content_type="series" />}/>
            
            <Route path="/movie/page/:pnum" element={<Home content_type="movie" />}/>
            <Route path="/series/page/:pnum" element={<Home content_type="series" />}/>
            
            <Route path="/movie/:urlnm" element={<Content content_type="movie" />}/>
            <Route path="/series/:urlnm" element={<Content content_type="series" />}/>
            
            
            <Route path="/content/:urlnm" element={<Content />}/>
            <Route path="/download/:id/:linkid" element={<Download />}/>
            <Route path="/dstart/:id/:linkid" element={<DownloadStart />}/>
          </Routes>
      </div>
      <Footer />
      </BrowserRouter>
    </div>
      
    </HelmetProvider>
    
  );
}

export default App;
