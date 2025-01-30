import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./lang/home";
import Login from "./login/login";
import "./App.css";
import Home from "./home/home";
import Cadastro from "./cadastro/cadastro";
import MapaTela from "./mapaTela/home";
const AppContent = () => {


  return (
    <div className="main-container">
      <div className="content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mapa" element={<MapaTela />} />
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
