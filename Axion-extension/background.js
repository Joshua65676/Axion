chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'syncBookmarks') {
    chrome.tabs.create({ url: 'https://twitter.com/i/bookmarks' });
  }
});