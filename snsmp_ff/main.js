'use strict'

var Main = { };

Main.stopPropagation = function(event) {
  event.stopPropagation();
  event.preventDefault();
}

Main.handleTwitterImageOnMatch = function(urlMatches) {
  if(urlMatches != null && urlMatches.length >= 2) {
    let url = urlMatches[1];

    let classicUrlMatch = url.match(/(http.*).(?:jpg|gif|png)/i)
    if(classicUrlMatch != null) {
      var extension = classicUrlMatch[0].replace(classicUrlMatch[1], "").replace(".","");
      url = classicUrlMatch[1] + "?format=" + extension + "&name=orig";
    }

    window.open(url, "_blank")
  }
}

document.addEventListener('click', function(event) { 
  if(!OptionsProvider.options.popoutEnabled)
    return;

  let t = event.target;

  // X / Twitter (Modern & Classic)
  if(document.URL.match("(http.*)//(twitter|x).com") != null) {
    let modernUrlMatch = t.src.match(/(http.*)[\?]format=(?:jpg|gif|png)/i)

    if(t.parentNode.classList.contains('js-adaptive-photo') || modernUrlMatch) {
      Main.stopPropagation(event);

      let imageUrl = t.src;
      
      if(modernUrlMatch != null) {
        imageUrl = modernUrlMatch[0].replace("?format=",".");
      }

      let urlMatches = imageUrl.match(/(http.*)/i)
      Main.handleTwitterImageOnMatch(urlMatches);
    }
  }
  

}, true);

OptionsProvider.loadOptions();
