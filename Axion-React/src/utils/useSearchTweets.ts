import { useEffect, useState } from "react";
import type { Tweet } from "./useFetchTweet";
import { API_BASE_URL } from "../constants/api";

export const useSearchTweets = (keyword: string | undefined) => {
  const [results, setResults] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!keyword) {
      setResults([]);
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/search.php?query=${keyword}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setResults([]);
      });
  }, [keyword]);

  return { results, loading };
};