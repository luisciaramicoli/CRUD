import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./lang/home";
import Login from "./login/login";
import "./App.css";
import Home from "./home/home";
const AppContent = () => {


  return (
    <div className="main-container">
      <div className="content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppContent /> {/* O useLocation é chamado dentro do Router, em AppContent */}
      </div>
    </Router>
  );
};

export default App;
