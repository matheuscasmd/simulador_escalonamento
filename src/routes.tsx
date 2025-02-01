import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Execucao from "./Execucao";
import { Processos } from "./Processos";
import { Welcome } from "./Home";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Welcome />} />
        <Route path="/app" element={<App />}>
          <Route path="execucao" element={<Execucao />} />
          <Route path="processos" element={<Processos />} />
        </Route>
        <Route path="*" element={<p>Essa página não existe</p>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
