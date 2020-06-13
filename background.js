chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript({
    file: './files_filler.js'
  });
});
