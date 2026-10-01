import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants/api";

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/get_categories.php`, {
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