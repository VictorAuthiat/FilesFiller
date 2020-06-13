chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript({
    file: './src/scripts/files_filler.js'
  });
});
