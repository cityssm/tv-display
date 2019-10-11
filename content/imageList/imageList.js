/* global window, tvDisplay, axios */

tvDisplay.tvContent = (function() {
  "use strict";

  let windowIntervalFn = null;

  const articleEle = tvDisplay.contentContainer.getElementsByTagName("article")[0];

  let backgroundImageFolderPrefix = "";
  let backgroundImages = [];
  let currentIndex = -1;

  function nextImage() {

    currentIndex += 1;

    if (currentIndex >= backgroundImages.length) {
      tvDisplay.next();
    } else {

      articleEle.style.backgroundImage = "url('" + backgroundImageFolderPrefix + backgroundImages[currentIndex] + "')";
    }
  }

  return {
    init: function(contentJSON) {

      const imageMillis = (tvDisplay.getContentProperty(contentJSON, "imageSeconds") || 10) * 1000;

      const fn_start = function() {
        nextImage();
        windowIntervalFn = window.setInterval(nextImage, imageMillis);
      };

      let backgroundImagesValue = tvDisplay.getContentProperty(contentJSON, "backgroundImages");

      if (backgroundImagesValue.constructor === Array) {
        backgroundImages = backgroundImagesValue;
        fn_start();
      }
      else {
        axios.get(backgroundImagesValue, {
            responseType: "json",
            data: {
              _: Date.now()
            }
          })
          .then(function(response) {
            return response.data;
          })
          .then(function(responseJSON) {
            backgroundImageFolderPrefix = backgroundImagesValue.substring(0, backgroundImagesValue.length - 10);
            backgroundImages = responseJSON.backgroundImages;
            fn_start();
          });
      }



    },
    destroy: function() {
      try {
        window.clearInterval(windowIntervalFn);
      } catch (e) {
        // ignore
      }
    }
  };
}());
