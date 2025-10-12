import React, { useEffect, useState } from "react";
import EmptyBookmark from "../components/Bookmark/EmptyBookmark";
import categoryColors from "./categoryColors";
import { formatTimeAgo } from "./timeAgo";
import { shortenText } from "./shortenText";
import { Time } from "../assets";

export interface Bookmark {
  tweet_id: string;
  tweet_text: string;
  username: string;
  profile_pic: string;
  media: string[];
  video: string;
  likes: string;
  retweets: string;
  comments: string;
  views: string;
  stickers: string[];
  is_verified: boolean;
  category: string;
  created_at: string
}

export function useFetchBookmarks() {
  const [bookmarksUI, setBookmarksUI] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const user_id = sessionStorage.getItem("user_id");

    if (!user_id) {
      console.warn("No user ID found in sessionStorage");
      setBookmarksUI(<div className="text-red-500">User not logged in.</div>);
      return;
    }

    fetch(
      `http://localhost/axion/Axion-PHP/get-bookmarks.php?user_id=${user_id}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Bookmarks response:", data);
        const bookmarks = data.bookmarks || [];

        if (bookmarks.length === 0) {
          setBookmarksUI(<EmptyBookmark />);
        } else {
          setBookmarksUI(
            <>
              <ul className="grid grid-cols-3 gap-5">
                {bookmarks.map((bm: Bookmark, i: number) => (
                  <li
                    key={i}
                    className="bg-WhiteGray w-[360px] h-[284px] p-[20px] gap-[10px] rounded-[30px]"
                  >
                    <main className="flex flex-col gap-3">
                      <span className={`text-[12px] font-medium leading-[15px] tracking-[0px] text-center w-[7rem] h-[28px] p-[5px] rounded-[20px] ${ categoryColors[bm.category?.toLowerCase()] || categoryColors.default}`}>{bm.category}</span>
                      <div className="flex flex-row justify-between">
                        <span className="text-[12px] text-TextGray font-medium leading-[20px] tracking-[-0.5px]">Bookmarked:</span>
                        <span className="flex flex-row text-TextGray text-[14px] font-normal leading-[18px] tracking-[0px]">
                          <img src={Time} alt="timeicon" />
                          {formatTimeAgo(bm.created_at)}</span>
                      </div>
                      <div className="flex flex-row gap-1">
                          <img src={bm.profile_pic} alt="ProfilePic"  className=""/>
                          <span className=""></span>
                          {/* <span className="">{bm.is_verified}</span> */}
                          <span className="text-[14px] font-normal leading-[15px] tracking-[0px] text-TextGray">@{bm.username}</span>
                      </div>
                      <div>
                        <span className="text-[16px] text-Black font-normal leading-[15px] tracking-[0px]">{shortenText(bm.tweet_text, 100)}</span>
                        
                      </div>
                    </main>
                  </li>
                ))}
              </ul>
            </>
          );
        }
      })
      .catch((err) => {
        console.error(" Failed to fetch bookmarks:", err);
        setBookmarksUI(
          <div className="text-red-500">Failed to load bookmark.</div>
        );
      });
  }, []);

  return bookmarksUI;
}
