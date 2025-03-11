import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import { Welcome, Execucao, Ajuda, Historico, Processos } from "./pages";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Welcome />} />
        <Route path="/app" element={<App />}>
        <Route path="execucao" element={<Execucao />} />
        <Route path="historico" element={<Historico />} />
        <Route path="processos" element={<Processos />} />
          <Route path="ajuda" element={<Ajuda />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" replace/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
