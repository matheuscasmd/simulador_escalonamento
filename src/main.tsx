import ReactDOM from "react-dom/client";
import AppRoutes from "./routes";
import "./index.css"
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Elemento root não encontrado!");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <AppRoutes/>
);
