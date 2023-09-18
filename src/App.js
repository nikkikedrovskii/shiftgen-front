import {Route, Routes} from 'react-router-dom'
import './App.css';
import Home from "./pages/home/home";
import Authorization from "./pages/google/authorization";
import Conditions from "./pages/conditions/conditions";
import RedirectPage from "./pages/redirect/Oauth2Redirect";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Overview from "./pages/Overview/overview";
import History from "./pages/history/history";

function App() {
  return (
   <div>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/authorization" element={<Authorization/>}/>
        <Route path="/conditions" element={<Conditions/>}/>
         <Route path="/oauth2/redirect" element={<RedirectPage/>}/>
         <Route path="/overview" element={<Overview/>}/>
         <Route path="/history" element={<History/>}/>
     </Routes>
   </div>
  );
}

export default App;
