'use strict'

const Main = { 
  stopDefaultPropagations : function(event) {
    event.stopPropagation();
    event.preventDefault();
  },

  // X / Twitter
  registerTwitterXEventHooks : function() {
    document.addEventListener('click', (event) => {
      if(!OptionsProvider.options.popoutEnabled) return;

      let t = event.target;

      if(document.URL.match("(http.*)//(twitter|x).com") != null) {
        let imageUrlMatch = (t.tagName === "IMG") ? t.src.match(/(http.*)[\?]format=(?:jpg|gif|png)/i) : null;

        if(imageUrlMatch != null) {
          this.stopDefaultPropagations(event);
          let imageUrl = imageUrlMatch[0] + "&name=orig";
          window.open(imageUrl, "_blank")
        }
      }

    }, true);
  },
  // Instagram
  registerInstagramEventHooks : function() {
    let startX, startY;

    document.addEventListener('click', (event) => {
      if (!OptionsProvider.options.popoutEnabled) return;

      const diffX = Math.abs(event.screenX - startX);
      const diffY = Math.abs(event.screenY - startY);

      if (diffX > 5 || diffY > 5) return;

      const isInsta = document.URL.match(/(http.*)\/\/www\.instagram\.com\/(p|reels|tv)\/./);
      const isHome = document.URL.endsWith("instagram.com/");
      if (!isInsta && !isHome) return;

      if (event.target.closest('button')) return;

      let t = event.target;

      let imgCandidateEl = t.querySelector('img') || 
                          t.parentElement?.querySelector('img') || 
                          t.previousElementSibling?.querySelector('img');

      if (imgCandidateEl) {
        let fullResUrl = imgCandidateEl.src;

        if (imgCandidateEl.srcset) {
          const entries = imgCandidateEl.srcset.split(',').map(entry => {
            const parts = entry.trim().split(' ');
            return {
              url: parts[0],
              width: parts[1] ? parseInt(parts[1].replace('w', ''), 10) : 0
            };
          });

          entries.sort((a, b) => b.width - a.width);
          if (entries.length > 0) fullResUrl = entries[0].url;
        }

        if (imgCandidateEl.naturalWidth > 150) {
          this.stopDefaultPropagations(event);
          window.open(fullResUrl, "_blank");
        }
      }
    }, true);

    const findInstagramNavButton = (targetX, targetY) => {
      const buttons = document.querySelectorAll(`button[aria-label]`);
      for (const btn of buttons) {
        const divs = btn.querySelectorAll('div');

        for (const div of divs) {
          const style = window.getComputedStyle(div);
          const pos = style.backgroundPosition;

          // Regex to grab the X and Y numbers from the string " -162px -98px"
          const matches = pos.match(/(-?\d+\.?\d*)px\s+(-?\d+\.?\d*)px/);
          
          if (matches) {
            const currentX = parseFloat(matches[1]);
            const currentY = parseFloat(matches[2]);

            // Fuzzy match (within 1px)
            const isMatchX = Math.abs(currentX - targetX) < 1;
            const isMatchY = Math.abs(currentY - targetY) < 1;

            if (isMatchX && isMatchY) {
              return btn;
            }
          }
        }
      }
      return null;
    }

    // Add keyboard shortcuts to navigate to previous and next image in a post using 4 and 6
    document.addEventListener("keydown", (event) => {
        if(event.key === "4") {
            let nextButton = findInstagramNavButton(-130, -98);
            if (nextButton) {
                nextButton.click();
            }
        }

        if(event.key === "6") {
            let backButton = findInstagramNavButton(-162, -98);
            if (backButton) {
                backButton.click();
            }
        }
    });
  },
  // Threads
  registerThreadsEventHooks : function() {
    let startX, startY;

    document.addEventListener('mousedown', function(event) {
      startX = event.screenX;
      startY = event.screenY;
    }, true);

    document.addEventListener('click', (event) => {
      if(!OptionsProvider.options.popoutEnabled)
        return;

      let t = event.target;

      const diffX = Math.abs(event.screenX - startX);
      const diffY = Math.abs(event.screenY - startY);
      const threshold = 5;

      if (diffX > threshold || diffY > threshold) {
        return;
      }

      let imgCandidateEl = t.tagName === "IMG" ? t : t.querySelector('img');

      if (imgCandidateEl) {
        let fullResUrl = imgCandidateEl.src;

        if (imgCandidateEl.srcset) {
          const entries = imgCandidateEl.srcset.split(',').map(entry => {
            const parts = entry.trim().split(' ');
            return {
              url: parts[0],
              width: parts[1] ? parseInt(parts[1].replace('w', ''), 10) : 0
            };
          });

          entries.sort((a, b) => b.width - a.width);
          
          if (entries.length > 0 && entries[0].url) {
            fullResUrl = entries[0].url;
          }
        }

        if (imgCandidateEl.naturalWidth > 150 || imgCandidateEl.width > 150) {
          this.stopDefaultPropagations(event);
          window.open(fullResUrl, "_blank");
        }
      }
    }, true);
  }

};

OptionsProvider.loadOptions();

if(document.URL.match("(http.*)//(twitter|x).com") != null) {
  Main.registerTwitterXEventHooks();
} else if(document.URL.match("(http.*)//www.instagram.com/") != null) {
  Main.registerInstagramEventHooks();
} else if(document.URL.match("(http.*)//www.threads.com/") != null) {
  Main.registerThreadsEventHooks();
}
