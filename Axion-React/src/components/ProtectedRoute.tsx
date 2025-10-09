import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost/axion/Axion-PHP/check-login.php", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn && data.username) {
          sessionStorage.setItem("screen_name", data.username);
          if (data.user_id) {
            sessionStorage.setItem("user_id", data.user_id);
          }
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoggedIn(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!loggedIn) return <Navigate to="/" replace />;

  return <>{children}</>;
}

export default ProtectedRoute;