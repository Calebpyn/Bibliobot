import {HashRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home";
import HelpWindow from "./components/HelpWindow";
import SpeechRec from "./components/SpeechRec";
import SpeechHome from "./components/SpeechHome";
import SpeechHomeTest from "./components/SpeechHomeTest";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/home" element={<SpeechHome/>}/>
          <Route path="/test" element={<SpeechHomeTest/>}/>
          <Route path="/help" element={<HelpWindow/>}/>
          <Route path="/speech" element={<SpeechRec/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
