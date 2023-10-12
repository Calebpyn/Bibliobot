import {HashRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home";
import HelpWindow from "./components/HelpWindow";
import SpeechRec from "./components/SpeechRec";
import SpeechHome from "./components/SpeechHome";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<SpeechHome/>}/>
          <Route path="/help" element={<HelpWindow/>}/>
          <Route path="/speech" element={<SpeechRec/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
