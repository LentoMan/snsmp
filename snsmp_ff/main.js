/*
if(localStorage["snsmp_enabled"] != undefined) {
  var snsmp_enabled = localStorage["snsmp_enabled"];

  var enable_snsmp_ls = (enabled_snsmp_download == 'Enable') ? 'Disable' : 'Enable';
}
else {
  var enable_disable_ls = 'Disable';
  var enabled_snsmp_download = 'Enable';
}

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/management/setEnabled

*/

document.addEventListener('click', function(event) {
  t = event.target
  
  // TweetDeck  
  if(t.classList.contains('js-media-image-link') && !t.parentNode.classList.contains('is-video')) {
    event.stopPropagation();
    event.preventDefault();
    var urlMatches = event.target.style.backgroundImage.match(/(http.*)[\?|\:]/i)
    if(urlMatches != null && urlMatches.length >= 2) {
      window.open(urlMatches[1] + ":large", "_blank")
    }
  }

  // Twitter
  if(t.parentNode.classList.contains('js-adaptive-photo')) {
    event.stopPropagation();
    event.preventDefault();
    var urlMatches = t.src.match(/(http.*)/i)
    if(urlMatches != null && urlMatches.length >= 2) {
      window.open(urlMatches[1] + ":large", "_blank")
    }
  }

}, true);

window.onload = function() {
}
