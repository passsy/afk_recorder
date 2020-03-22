function observeMessages() {
  chrome.runtime.onMessage.addListener(function(msg) {
    console.log("message recieved" + msg);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  observeMessages();
});
