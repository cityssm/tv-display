/* global window, tvDisplay, axios */

tvDisplay.tvContent = (function() {
  "use strict";

  let windowIntervalFn = null;

  const articleEle = tvDisplay.contentContainer.getElementsByTagName("article")[0];

  let remoteURL = "";
  let backgroundImageFolderPrefix = "";
  let backgroundImages = [];
  let currentIndex = -1;
  let maxSlideCount = -1;

  function nextImage() {

    currentIndex += 1;

    if (currentIndex >= backgroundImages.length || currentIndex >= maxSlideCount) {
      tvDisplay.next();
    } else {
      articleEle.style.backgroundImage = "url('" + remoteURL + backgroundImageFolderPrefix + backgroundImages[currentIndex].replace(/\'/g, "\\'") + "')";
    }
  }

  function shuffleBackgroundImages() {

    // see https://stackoverflow.com/a/2450976/1383298

    let shuffleIndex = backgroundImages.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (shuffleIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * shuffleIndex);
      shuffleIndex -= 1;

      // And swap it with the current element.
      temporaryValue = backgroundImages[shuffleIndex];
      backgroundImages[shuffleIndex] = backgroundImages[randomIndex];
      backgroundImages[randomIndex] = temporaryValue;
    }
  }

  return {
    init: function(contentJSON) {

      remoteURL = tvDisplay.getContentProperty(contentJSON, "remoteURL") || "";

      const fn_start = function() {

        const slideMillis = (tvDisplay.getContentProperty(contentJSON, "slideSeconds") || 10) * 1000;
        const doShuffleBackgroundImages = tvDisplay.getContentProperty(contentJSON, "shuffleBackgroundImages");

        maxSlideCount = (tvDisplay.getContentProperty(contentJSON, "maxSlideCount") || backgroundImages.length);

        if (backgroundImages.length === 0) {
          tvDisplay.next();
        } else {
          if (doShuffleBackgroundImages) {
            shuffleBackgroundImages();
          }
          nextImage();
          windowIntervalFn = window.setInterval(nextImage, slideMillis);
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
            },
            timeout: 3000
          })
          .then(function(response) {
            return response.data;
          })
          .then(function(responseJSON) {

            backgroundImageFolderPrefix = backgroundImagesValue.substring(0, backgroundImagesValue.lastIndexOf("/") + 1);

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
