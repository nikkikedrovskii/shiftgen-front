import {Route, Routes} from 'react-router-dom'
import './App.css';
import Home from "./pages/home/home";
import Authorization from "./pages/google/authorization";
import Conditions from "./pages/conditions/conditions";
import RedirectPage from "./pages/redirect/Oauth2Redirect";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import History from "./pages/history/history";
import Error from "./pages/error/error";
import Case from "./pages/Overview/case";
import Plan from "./pages/Overview/plan";
import Strategy from "./pages/Overview/strategy";
import {TimerProvider} from "./pages/timer/TimerProvider";
import Help from "./pages/help/help";

function App() {
  return (
   <div>
     <Routes>
        <Route path="/" element={<Home/>}/>
         <Route path="/authorization" element={<Authorization/>}/>
         <Route path="/conditions" element={<Conditions/>}/>
         <Route path="/oauth2/redirect" element={<RedirectPage/>}/>
         <Route path="/case" element={<Case/>}/>
         <Route path="/plan" element={<Plan/>}/>
         <Route path="/strategy" element={<Strategy/>}/>
         <Route path="/history" element={<History/>}/>
         <Route path="/error" element={<Error/>}/>
         <Route path="/help" element={<Help/>}/>
     </Routes>
   </div>
  );
}

export default () => (
    <TimerProvider>
        <App />
    </TimerProvider>
);
