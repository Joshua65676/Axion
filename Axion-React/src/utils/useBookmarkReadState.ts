import { useEffect, useState } from "react";

type TweetId = string | number;

function getStorageKey() {
  const userId = sessionStorage.getItem("user_id") || "guest";
  return `axion:read-bookmarks:${userId}`;
}

function getReadIds(): string[] {
  try {
    const stored = JSON.parse(localStorage.getItem(getStorageKey()) || "[]");
    return Array.isArray(stored) ? stored.map(String) : [];
  } catch {
    return [];
  }
}

function storeReadState(tweetId: TweetId, isRead: boolean) {
  const readIds = new Set(getReadIds());
  const normalizedId = String(tweetId);

  if (isRead) readIds.add(normalizedId);
  else readIds.delete(normalizedId);

  try {
    localStorage.setItem(getStorageKey(), JSON.stringify([...readIds]));
  } catch {
    // Keep the in-memory button state usable when browser storage is unavailable.
  }
}

export function useBookmarkReadState(tweetId: TweetId) {
  const normalizedId = String(tweetId);
  const [isRead, setIsRead] = useState(() =>
    getReadIds().includes(normalizedId),
  );

  useEffect(() => {
    setIsRead(getReadIds().includes(normalizedId));
  }, [normalizedId]);

  const toggleRead = () => {
    const nextReadState = !isRead;
    storeReadState(normalizedId, nextReadState);
    setIsRead(nextReadState);
  };

  return { isRead, toggleRead };
}