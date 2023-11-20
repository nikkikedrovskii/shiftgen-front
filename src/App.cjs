import {Route, Routes} from 'react-router-dom'
import './App.css';
import Home from "./pages/home/home.js";
import Authorization from "./pages/google/authorization.js";
import Conditions from "./pages/conditions/conditions.js";
import RedirectPage from "./pages/redirect/Oauth2Redirect.js";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import History from "./pages/history/history.js";
import Error from "./pages/error/error.cjs";
import {TimerProvider} from "./pages/timer/TimerProvider.js";
import Help from "./pages/help/help.js";
import Example from "./pages/example/example.js";
import Security from "./pages/security/Security";
import Overview from "./pages/Overview/Overview";
import Setting from "./pages/setting/Setting";

function App() {
  return (
   <div>
     <Routes>
        <Route path="/" element={<Home/>}/>
         <Route path="/authorization" element={<Authorization/>}/>
         <Route path="/conditions" element={<Conditions/>}/>
         <Route path="/oauth2/redirect" element={<RedirectPage/>}/>
         <Route path="/history" element={<History/>}/>
         <Route path="/error" element={<Error/>}/>
         <Route path="/help" element={<Help/>}/>
         <Route path="/example" element={<Example/>}/>
         <Route path="/security" element={<Security/>}/>
         <Route path="/overview" element={<Overview/>}/>
         <Route path="/setting" element={<Setting/>}/>
     </Routes>
   </div>
  );
}

export default () => (
    <TimerProvider>
        <App />
    </TimerProvider>
);
