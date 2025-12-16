import { useEffect, useState } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://joshdev.infinityfreeapp.com/get_categories.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched categories:", data);
        setCategories(data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategories([]);
      });

  }, []);

  return categories;
};