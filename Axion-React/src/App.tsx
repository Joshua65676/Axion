import "./App.css";
import Navbar from "./components/Navbar";
import Menu from "./components/DesktopMenu/Menu";
import ConnectAcc from "./components/ConnectAcc/ConnectAcc";

function App() {

  return (
    <section className="container max-w-6xl mx-auto w-full">
       <Menu />
      <main className="">
        <div className="">
          <Navbar  />
        </div>
          {/* Main content goes here */}
        <div className="flex justify-center items-center text-center h-screen pl-[40rem]">
          <ConnectAcc />
        </div>
      </main>
    </section>
  );
}

export default App;
