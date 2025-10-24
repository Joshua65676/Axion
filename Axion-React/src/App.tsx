import "./App.css"
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes"; // move your routing logic here

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;