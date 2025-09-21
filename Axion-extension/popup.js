document.getElementById('sync').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      window.scrollTo(0, 0);
      let interval = setInterval(() => {
        window.scrollBy(0, 1000);
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
          clearInterval(interval);
        }
      }, 1000);
    }
  });

  document.getElementById('status').innerText = 'Syncing bookmarks...';
});