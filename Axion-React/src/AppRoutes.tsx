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
import Settings from "./components/Settings";
import MobileNavbar from "./components/MobileNavBar/Navbar";
import ExtensionNotInstall from "./components/Extension/ExtensionNotInstall";

function AppRoutes() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const pageClassName =
    "min-h-screen w-full px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pb-8 lg:pt-24";

  return (
    <main className="min-h-screen w-full lg:ml-[18.8rem] lg:w-[calc(100%-18.8rem)]">
      <div className="flex lg:hidden">
        <MobileNavbar />
      </div>
      <div className="hidden lg:flex">
        <Menu />
      </div>
      <div className="hidden lg:flex">
        <Navbar />
      </div>
      <Routes location={backgroundLocation || location}>
        <Route
          path="/"
          element={
            <section
              className={`${pageClassName} flex items-center justify-center text-center`}
            >
              <ConnectAcc />
            </section>
          }
        />
        <Route
          path="/extension-setup"
          element={
            <section className={pageClassName}>
              <ExtensionNotInstall />
            </section>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <section className={pageClassName}>
                <Home />
              </section>
            </ProtectedRoute>
          }
        />
        <Route
          path="/:username/tweet/:tweet_id"
          element={
            <ProtectedRoute>
              <section className={pageClassName}>
                <TweetDetails />
              </section>
            </ProtectedRoute>
          }
        />
        <Route
          path="/allbookmarks"
          element={
            <ProtectedRoute>
              <section className={pageClassName}>
                <AllBookmark />
              </section>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <section className={pageClassName}>
                <Search />
              </section>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search/:keyword"
          element={
            <ProtectedRoute>
              <section className={pageClassName}>
                <Search />
              </section>
            </ProtectedRoute>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectedRoute>
              <section className={pageClassName}>
                <Category />
              </section>
            </ProtectedRoute>
          }
        />
        <Route
          path="/category/:name"
          element={
            <ProtectedRoute>
              <section className={pageClassName}>
                <Category />
              </section>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <section className={pageClassName}>
                <Settings />
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
