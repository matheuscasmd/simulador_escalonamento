import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Execucao from "./pages/Execucao";
import { Processos } from "./pages/Processos";
import { Welcome } from "./pages/Home";
import { Ajuda } from "./pages/Ajuda";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Welcome />} />
        <Route path="/app" element={<App />}>
          <Route path="execucao" element={<Execucao />} />
          <Route path="processos" element={<Processos />} />
          <Route path="ajuda" element={<Ajuda/>}/>
        </Route>
        <Route path="*" element={<p>Essa página não existe</p>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
