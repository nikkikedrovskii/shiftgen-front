import {Route, Routes} from 'react-router-dom'
import './App.css';
import Authorization from "./pages/google/authorization.js";
import Conditions from "./pages/conditions/conditions.js";
import RedirectPage from "./pages/redirect/Oauth2Redirect.js";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Error from "./pages/error/error.js";
import {TimerProvider} from "./pages/timer/TimerProvider.js";
import Help from "./pages/help/help.js";
import Example from "./pages/example/example.js";
import Security from "./pages/security/Security";
import Overview from "./pages/Overview/Overview";
import Setting from "./pages/setting/Setting";
import Chat from "./pages/chat/Chat";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import Billing from "./pages/billing/Billing";
import AiTrism from "./pages/ai_trism/AiTrism";
import DalleChatPage from "./components/dalle/DalleChatPage";
import History from "./pages/history/History";

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
         <Route path="/chat" element={<Chat/>}/>
         <Route path="/login" element={<LoginPage/>}/>
         <Route path="/billing" element={<Billing/>}/>
         <Route path="/aitrism" element={<AiTrism/>}/>
         <Route path="/dallechat" element={<DalleChatPage/>}/>
         <Route path="/imagehistory" element={<History/>}/>
     </Routes>
   </div>
  );
}

export default () => (
    <TimerProvider>
        <App />
    </TimerProvider>
);
