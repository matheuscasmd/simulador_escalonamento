import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Execucao from "./Execucao";
import { Processos } from "./components/Processos";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="execucao" element={<Execucao />} />
          <Route path="processos" element={<Processos />} />
          <Route path="*" element={<p>Essa página não existe</p>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
