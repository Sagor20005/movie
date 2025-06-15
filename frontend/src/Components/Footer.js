import "./Styles/Footer.css"
import { Link } from "react-router-dom"
function Footer(){
  return(
    <>
      <footer className="footer">
      <div className="footer_containar">
        
        {/* ABOUT US */}
        <div className="f_about">
          <h4>About us.</h4>
          <p>This is a Best website for downloading latest movies Bangla,English,Hindi. Sheare Your friend and family member for Enjoy all movies.</p>
        </div>
        
        {/* CONTACT US */}
        <div className="f_contact">
          <h4>Contact.</h4>
          <p>Admin: Jakareya Haldar</p>
          <p>Email: ms6392883@gmail.com</p>
          <p>Khulna, Bagerhat</p>
        </div>
        
        {/* QUICK LINKS */}
        <div className="f_quick_links">
          <h4>Quick Links.</h4>
          <ul>
            <li> <Link to="/">Home</Link> </li>
            <li> <Link to="/">Contact us</Link> </li>
            <li> <Link to="/">How to Use</Link> </li>
          </ul>
        </div>
        
        {/* FOOTER BOTTOM */}
        <div className="f_bottom">
          <p>&copy; 2025 Jakareya Haldar. All rights reserved.</p>
          <div className="social">
            <Link to="https://facebook.com/groups/4021978274757581/">Facebook</Link>
            <Link to="#">Tiktok</Link>
            <Link to="#">Youtube</Link>
          </div>
        </div>
        
      </div>
    </footer>
    </>
    )
}
export default Footer