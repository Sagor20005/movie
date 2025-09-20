import {Routes, Route} from "react-router-dom"
import Navbar from "./Components/Navbar.js"
import Dashbord from "./Components/Dashbord.js"
import ContentManager from "./Components/ContentManager.js"
import Setting from "./Components/Setting.js"
import AddContent from "./Components/AddContent.js"

function App() {
  return (
    <div className="min-h-[100dvh] min-w-[100vw] font-mono">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashbord />} />
        <Route path="/manage-content" element={<ContentManager />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/add" element={<AddContent />} />
      </Routes>
    </div>
  );
}

export default App;
