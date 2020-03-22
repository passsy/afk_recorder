function removeDraft() {
  // remove old draft
  var ts = document.getElementById("transcript");
  var drafts = ts.getElementsByClassName("draft");
  while (drafts[0]) {
    ts.removeChild(drafts[0]);
  }
}

function addText(result) {
  var ts = document.getElementById("transcript");
  var span = document.createElement("span");
  span.innerHTML = result.alternatives[0].transcript;
  ts.appendChild(span);
}

var _currentSpeaker;

function addSpeaker(id) {
  if (_currentSpeaker === id) return;
  _currentSpeaker = id;

  var ts = document.getElementById("transcript");
  if (ts.lastElementChild);
  var last = ts.removeChild(ts.lastElementChild);

  var p = document.createElement("p");
  p.innerHTML = "Sprecher " + id;
  p.className = "speaker";
  ts.appendChild(p);
  if (last) {
    ts.appendChild(last);
  }
}

function addDraft(result) {
  var ts = document.getElementById("transcript");
  var span = document.createElement("span");
  span.innerHTML = result.alternatives[0].transcript;
  span.className = "draft";
  ts.appendChild(span);
}

function observeMessages() {
  chrome.runtime.onMessage.addListener(function(event) {
    if (event.tsEvent) {
      var transcriptEvent = JSON.parse(event.tsEvent);

      // transcript
      if (transcriptEvent.results) {
        for (i = 0; i < transcriptEvent.results.length; i++) {
          var result = transcriptEvent.results[i];
          console.log("event:\n" + JSON.stringify(result));
          if (result.final === true) {
            removeDraft();
            addText(result);
          }
          if (result.final === false) {
            removeDraft();
            addDraft(result);
          }
        }
      }

      // speaker
      if (transcriptEvent.speaker_labels) {
        var labels = transcriptEvent.speaker_labels;
        addSpeaker("" + labels[0].speaker);
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  observeMessages();
});
