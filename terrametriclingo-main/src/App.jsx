import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Quiz from "./pages/Questionario";
import QuestionarioPublico from "./pages/QuestionarioPublico";
import Learn from "./pages/Learn";
import Navbar from "./Navbar";
import LoginSignup from "./pages/LoginSignup";
import CursoBasico from "./pages/CursoBasico";
import CursoMedio from "./pages/CursoMedio";
import CursoAvancado from "./pages/CursoAvancado";
import Vitrine from "./pages/Vitrine";
import AnimaisExtincao from "./pages/AnimaisExtincao";
import PlantasExtincao from "./pages/PlantasExtincao";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionario" element={<Quiz />} />
        <Route path="/questionario-publico" element={<QuestionarioPublico />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/vitrine" element={<Vitrine />} />
        <Route path="/loginsingup" element={<LoginSignup />} />
        <Route path="/curso-basico" element={<CursoBasico />} />
        <Route path="/curso-medio" element={<CursoMedio />} />
        <Route path="/curso-avancado" element={<CursoAvancado />} />
        <Route path="/animais-extincao" element={<AnimaisExtincao />} />
        <Route path="/plantas-extincao" element={<PlantasExtincao />} />
      </Routes>
    </div>
  );
}

export default App;