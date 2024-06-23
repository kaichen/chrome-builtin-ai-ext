export { }

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, _tab) => {
  if (changeInfo.status === 'complete') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (_tabs) {
      chrome.tabs.sendMessage(tabId, { action: 'getReadableContent' }, (response) => {
        if (response) {
          console.log('📚 SET Readable content:', response)
          chrome.storage.local.set({ readableContent: response });
        }
      });
    })
  }
});
