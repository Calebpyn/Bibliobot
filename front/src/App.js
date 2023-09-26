import {HashRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home";
import HelpWindow from "./components/HelpWindow";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/help" element={<HelpWindow/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
