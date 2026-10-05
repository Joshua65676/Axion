import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_BASE_URL } from "../constants/api";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/check-login.php`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn && data.username) {
          sessionStorage.setItem("screen_name", data.username);
          if (data.user_id) {
            sessionStorage.setItem("user_id", data.user_id);
          }
          // chrome.runtime.sendMessage({
          //   type: "SET_USER",
          //   user: {
          //     screen_name: data.username,
          //     user_id: data.user_id,
          //   },
          // });

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

  if (loading)
    return (
      <div
        className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center gap-3 text-center text-TextColor"
        role="status"
        aria-live="polite"
      >
        <span
          className="size-8 animate-spin rounded-full border-2 border-BorderGray border-t-BgBlue"
          aria-hidden="true"
        />
        <span className="text-sm">Getting your workspace ready...</span>
      </div>
    );
  if (!loading && !loggedIn) return <Navigate to="/" replace />;

  return <>{children}</>;
}

export default ProtectedRoute;
