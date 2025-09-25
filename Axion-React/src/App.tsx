import "./App.css";
import Navbar from "./components/Navbar";
import Menu from "./components/DesktopMenu/Menu";

function App() {

  return (
    <section className="container max-w-6xl mx-auto w-full">
      <main className="">
        <div className="">
          <Menu />
          <Navbar  />
        </div>
      </main>
    </section>
  );
}

export default App;
