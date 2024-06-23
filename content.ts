export { }
console.log(
  "You may find that having is not so pleasing a thing as wanting. This is not logical, but it is often true."
)

import { Readability } from '@mozilla/readability';

function getReadableContent() {
  const article = new Readability(document.cloneNode(true)).parse();
  return article
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getReadableContent') {
    const result = getReadableContent();
    sendResponse(result);
    console.log('📚 Readable content sent to side panel.', result)
  }
});
