import {Routes, Route} from "react-router-dom"
import Navbar from "./Pages/Navbar.js"
import Dashbord from "./Pages/Dashbord/Dashbord.js"
import ContentManager from "./Pages/ContentManager/ContentManager.js"
import Setting from "./Pages/Setting/Setting.js"
import AddContent from "./Pages/AddContent/AddContent.js"
import AditionalData from "./Pages/AditionalDataManager/AditionalDataManager.js"
import UslessImages from "./Pages/UselessImages/UselessImages.js"

function App() {
  return (
    <div className="font-mono">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashbord />} />
        <Route path="/manage-content" element={<ContentManager />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/add" element={<AddContent />} />
        <Route path="/aditional-data" element={<AditionalData />} />
        <Route path="/uselessimages" element={<UslessImages />} />
      </Routes>
    </div>
  );
}

export default App;
