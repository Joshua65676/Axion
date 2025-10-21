import { useEffect, useState } from "react";
import type { Tweet } from "./useFetchTweet";

export const useSearchTweets = (keyword: string | undefined) => {
  const [results, setResults] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!keyword) {
      setResults([]);
      setLoading(false);
      return;
    }

    fetch(`http://localhost/axion/Axion-PHP/search.php?query=${keyword}`)
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