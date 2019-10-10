/* global window, tvDisplay */

tvDisplay.tvContent = (function() {
  "use strict";

  let windowIntervalFn = null;

  const articleEle = tvDisplay.contentContainer.getElementsByTagName("article")[0];

  let backgroundImages = [];
  let currentIndex = -1;

  function nextImage() {

    currentIndex += 1;

    if (currentIndex >= backgroundImages.length) {
      tvDisplay.next();
    } else {

      articleEle.style.backgroundImage = "url('" + backgroundImages[currentIndex] + "')";
    }
  }

  return {
    init: function(contentJSON) {

      backgroundImages = tvDisplay.getContentProperty(contentJSON, "backgroundImages");

      nextImage();

      const imageMillis = (tvDisplay.getContentProperty(contentJSON, "imageSeconds") || 10) * 1000;

      windowIntervalFn = window.setInterval(nextImage, imageMillis);
    },
    destroy: function() {
      window.clearInterval(windowIntervalFn);
    }
  };
}());
