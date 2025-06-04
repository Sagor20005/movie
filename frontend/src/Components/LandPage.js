import "./Styles/LandPage.css"
import { useNavigate } from "react-router-dom"

function LandPage(){
  const Navigate = useNavigate()
  return(
    <div className="land_containar">
      <h1>Unlimited movies, Tv shows, and more</h1>
      <span>Complately free all content.</span>
      <p>Ready to watch? Avleable on movieflex website.
      select a movie, tv shows, much more.</p>
      <button onClick={()=>Navigate("/home")}>Get Started.</button>
    </div>
    )
}

export default LandPage