import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Menu from "./components/DesktopMenu/Menu";
import ConnectAcc from "./components/ConnectAcc/ConnectAcc";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <main className="container max-w-6xl mx-auto w-full">
        <Menu />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <section className="flex justify-center items-center text-center h-screen pl-[40rem]">
                <ConnectAcc />
              </section>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <section className="flex justify-center items-center text-center h-screen pl-[40rem]">
                  <Home />
                </section>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
