import {Routes, Route} from "react-router-dom"
import Navbar from "./Pages/Navbar.js"
import Dashbord from "./Pages/Dashbord/Dashbord.js"
import ContentManager from "./Pages/ContentManager/ContentManager.js"
import Setting from "./Pages/Setting/Setting.js"
import AddContent from "./Pages/AddContent/AddContent.js"
import AditionalData from "./Pages/AditionalDataManager/AditionalDataManager.js"
import UslessImages from "./Pages/UselessImages/UselessImages.js"
import AuthComponent from "./Pages/AuthComponent.js"
import Login from "./Pages/Auth/Login.js"
import { useLocalStorage } from "./hooks/useLocalStorage.js"


function App() {
  
  const [IsAuth,setIsAuth] = useLocalStorage("auth",false)
  
  return (
    <div className="font-mono">
      <Navbar />
      <Routes>
        <Route element={<AuthComponent IsAuth={IsAuth} />}>
          <Route path="/" element={<Dashbord />} />
          <Route path="/manage-content" element={<ContentManager />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/add" element={<AddContent />} />
          <Route path="/aditional-data" element={<AditionalData />} />
          <Route path="/uselessimages" element={<UslessImages />} />
        </Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} IsAuth={IsAuth} />} />
      </Routes>
    </div>
  );
}

export default App;
