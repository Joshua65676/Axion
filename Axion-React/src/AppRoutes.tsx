import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Menu from "./components/DesktopMenu/Menu";
import ConnectAcc from "./components/ConnectAcc/ConnectAcc";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import TweetDetails from "./components/View/TweetDetails";
import AllBookmark from "./components/AllBookmark";
import Search from "./components/Search";
import Category from "./components/Category";
import LogOut from "./components/Account/LogOut";

function AppRoutes() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <main className="container max-w-6xl mx-auto w-full">
      <Menu />
      <Navbar />
      <Routes location={backgroundLocation || location}>
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
              <section className="absolute top-0 left-[18.8rem] px-[30px] py-[20px] w-[75rem] pt-[6rem]">
                <Home />
              </section>
            </ProtectedRoute>
          }
        />
        <Route
          path="/:username/tweet/:tweet_id"
          element={
            <ProtectedRoute>
              <section className="absolute top-0 left-[18.8rem] px-[30px] py-[20px] w-[75rem] pt-[6rem]">
                <TweetDetails />
              </section>
            </ProtectedRoute>
          }
        />
        <Route
          path="/allbookmarks"
          element={
            <ProtectedRoute>
              <section className="absolute top-0 left-[18.8rem] px-[30px] py-[20px] w-[75rem] pt-[6rem]">
                <AllBookmark />
              </section>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <section className="absolute top-0 left-[18.8rem] px-[30px] py-[20px] w-[75rem] pt-[6rem]">
                <Search />
              </section>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search/:keyword"
          element={
            <ProtectedRoute>
              <section className="absolute top-0 left-[18.8rem] px-[30px] py-[20px] w-[75rem] pt-[6rem]">
                <Search />
              </section>
            </ProtectedRoute>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectedRoute>
              <section className="absolute top-0 left-[18.8rem] px-[30px] py-[20px] w-[75rem] pt-[6rem]">
                <Category />
              </section>
            </ProtectedRoute>
          }
        />
        <Route
          path="/category/:name"
          element={
            <ProtectedRoute>
              <section className="absolute top-0 left-[18.8rem] px-[30px] py-[20px] w-[75rem] pt-[6rem]">
                <Category />
              </section>
            </ProtectedRoute>
          }
        />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <section className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <LogOut />
                </section>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </main>
  );
}

export default AppRoutes;
