import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Elemento root não encontrado!");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
