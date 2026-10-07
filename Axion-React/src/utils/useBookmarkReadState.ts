import { useEffect, useState } from "react";

type TweetId = string | number;

const READ_STATE_EVENT = "axion:read-bookmarks-changed";

function getStorageKey() {
  const userId = sessionStorage.getItem("user_id") || "guest";
  return `axion:read-bookmarks:${userId}`;
}

export function getReadIds(): string[] {
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

function notifyReadStateChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(READ_STATE_EVENT));
}

export function useBookmarkReadState(tweetId: TweetId) {
  const normalizedId = String(tweetId);
  const [isRead, setIsRead] = useState(() =>
    getReadIds().includes(normalizedId),
  );

  useEffect(() => {
    const syncReadState = () => {
      setIsRead(getReadIds().includes(normalizedId));
    };

    syncReadState();
    window.addEventListener(READ_STATE_EVENT, syncReadState);
    window.addEventListener("storage", syncReadState);

    return () => {
      window.removeEventListener(READ_STATE_EVENT, syncReadState);
      window.removeEventListener("storage", syncReadState);
    };
  }, [normalizedId]);

  const toggleRead = () => {
    const nextReadState = !isRead;
    storeReadState(normalizedId, nextReadState);
    setIsRead(nextReadState);
    notifyReadStateChange();
  };

  return { isRead, toggleRead };
}

export function useUnreadBookmarkCount(
  bookmarks: Array<{ tweet_id?: string | number }> = [],
) {
  const [unreadCount, setUnreadCount] = useState(() =>
    bookmarks.filter((bookmark) => {
      const tweetId = bookmark.tweet_id;
      return tweetId !== undefined && !getReadIds().includes(String(tweetId));
    }).length,
  );

  useEffect(() => {
    const syncUnreadCount = () => {
      setUnreadCount(
        bookmarks.filter((bookmark) => {
          const tweetId = bookmark.tweet_id;
          return (
            tweetId !== undefined && !getReadIds().includes(String(tweetId))
          );
        }).length,
      );
    };

    syncUnreadCount();
    window.addEventListener(READ_STATE_EVENT, syncUnreadCount);
    window.addEventListener("storage", syncUnreadCount);

    return () => {
      window.removeEventListener(READ_STATE_EVENT, syncUnreadCount);
      window.removeEventListener("storage", syncUnreadCount);
    };
  }, [bookmarks]);

  return unreadCount;
}