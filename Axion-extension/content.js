setTimeout(() => {
  function categorizeTweet(text) {
    const lower = text.toLowerCase();
    if (
      lower.includes("figma") ||
      lower.includes("design") ||
      lower.includes("ui/ux")
    )
      return "Design";
    if (
      lower.includes("ethereum") ||
      lower.includes("crypto") ||
      lower.includes("web3")
    )
      return "Web3";
    if (
      lower.includes("football") ||
      lower.includes("nba") ||
      lower.includes("messi") ||
      lower.includes("football")
    )
      return "Sports";
    if (
      lower.includes("javascript") ||
      lower.includes("python") ||
      lower.includes("coding")
    )
      return "Programming";
    if (
      lower.includes("movie") ||
      lower.includes("film") ||
      lower.includes("cinema") ||
      lower.includes("netflix")
    )
      return "Movies";
    if (
      lower.includes("music") ||
      lower.includes("song") ||
      lower.includes("album") ||
      lower.includes("spotify")
    )
      return "Music";
    if (
      lower.includes("art") ||
      lower.includes("painting") ||
      lower.includes("sculpture")
    )
      return "Art";
    if (
      lower.includes("science") ||
      lower.includes("biology") ||
      lower.includes("chemistry")
    )
      return "Science";
    if (
      lower.includes("technology") ||
      lower.includes("gadgets") ||
      lower.includes("AI")
    )
      return "Technology";
    if (
      lower.includes("betting") ||
      lower.includes("gambling") ||
      lower.includes("odds")
    )
      return "Betting";
    if (
      lower.includes("gaming") ||
      lower.includes("cod") ||
      lower.includes("streaming")
    )
      return "Gaming";
    return "Uncategorized";
  }

  const tweets = Array.from(document.querySelectorAll("article")).map((el) => {
    const text = el.innerText;
    return {
      text,
      id: el.dataset.tweetId || null,
      category: categorizeTweet(text),
    };
  });

  fetch("http://localhost/axion/Axion-PHP/save_bookmarks.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: "twitter_user_id", bookmarks: tweets }),
  }).then(() => {
    console.log("Bookmarks sent to backend");
  });
}, 10000); // Wait 10s for scroll to finish
