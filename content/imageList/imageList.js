/* global window, tvDisplay, axios */

tvDisplay.tvContent = (function() {
  "use strict";

  let windowIntervalFn = null;

  const articleEle = tvDisplay.contentContainer.getElementsByTagName("article")[0];

  let remoteURL = "";
  let backgroundImageFolderPrefix = "";
  let backgroundImages = [];
  let currentIndex = -1;

  function nextImage() {

    currentIndex += 1;

    if (currentIndex >= backgroundImages.length) {
      tvDisplay.next();
    } else {
      articleEle.style.backgroundImage = "url('" + remoteURL + backgroundImageFolderPrefix + backgroundImages[currentIndex] + "')";
    }
  }

  return {
    init: function(contentJSON) {

      remoteURL = tvDisplay.getContentProperty(contentJSON, "remoteURL") || "";

      const imageMillis = (tvDisplay.getContentProperty(contentJSON, "imageSeconds") || 10) * 1000;

      const fn_start = function() {
        if (backgroundImages.length === 0) {
          tvDisplay.next();
        } else {
          nextImage();
          windowIntervalFn = window.setInterval(nextImage, imageMillis);
        }
      };

      let backgroundImagesValue = tvDisplay.getContentProperty(contentJSON, "backgroundImages");

      if (backgroundImagesValue.constructor === Array) {
        backgroundImages = backgroundImagesValue;
        fn_start();

      } else {
        axios.get(remoteURL + backgroundImagesValue, {
            responseType: "json",
            params: {
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
          })
          .catch(function() {
            try {
              window.console.error("imageList: Unable to load " + remoteURL + backgroundImagesValue);
              
            } catch (e) {
              // ignore
            }

            tvDisplay.next();
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
