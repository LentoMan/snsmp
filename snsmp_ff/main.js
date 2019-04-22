'use strict'

document.addEventListener('click', function(event) { 
  if(!OptionsProvider.options.popoutEnabled)
    return;

  let t = event.target;
  
  // TweetDeck
  if(t.classList.contains('js-media-image-link') && !t.parentNode.classList.contains('is-video')) {
    event.stopPropagation();
    event.preventDefault();
    let urlMatches = event.target.style.backgroundImage.match(/(http.*)[\?|\:]/i)
    if(urlMatches != null && urlMatches.length >= 2) {
      window.open(urlMatches[1] + ":large", "_blank")
    }
  }

  // Twitter
  if(t.parentNode.classList.contains('js-adaptive-photo')) {
    event.stopPropagation();
    event.preventDefault();
    let urlMatches = t.src.match(/(http.*)/i)
    if(urlMatches != null && urlMatches.length >= 2) {
      window.open(urlMatches[1] + ":large", "_blank")
    }
  }
}, true);

OptionsProvider.loadOptions();
