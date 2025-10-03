import { useEffect, useState } from "react";

function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("http://localhost/axion/Axion-PHP/check-login.php", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn && data.username) {
          sessionStorage.setItem("screen_name", data.username);
          setUsername(data.username);
        } else {
          console.warn("User not logged in");
        }
      })
      .catch(err => {
        console.error("Fetch failed:", err);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-Black">Welcome, {username}</h1>
    </div>
  );
}

export default Home;