import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Search from "./pages/Search";

function App() {
  return (
    <div className="App">
      Hello Aditya. Im about to test my new build command
      <Link to="/search">Chalo</Link>
      {/* <LandingPage></LandingPage> */}
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route path="/search" element={<Search />}></Route>
        {/* <Route 
                path="/login" 
                element={<Login/>}>
            </Route> */}
      </Routes>
    </div>
  );
}

export default App;
