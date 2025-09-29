import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";

  return isLoggedIn ? children : <Navigate to="/" />;
}

export default ProtectedRoute;