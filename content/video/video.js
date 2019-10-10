/* global document, tvDisplay */

tvDisplay.tvContent = (function() {
  "use strict";

  const videoEle = tvDisplay.contentContainer.getElementsByTagName("video")[0];

  function endedFn_next() {
    tvDisplay.next();
  }

  return {
    init: function(contentJSON) {

      // set the sources

      const sourceList = tvDisplay.getContentProperty(contentJSON, "sourceList");

      for (let i = 0; i < sourceList.length; i += 1) {

        const sourceEle = document.createElement("source");
        sourceEle.setAttribute("src", sourceList[i]);
        videoEle.insertAdjacentElement("beforeend", sourceEle);
      }

      // listen for the end of the video

      videoEle.addEventListener("ended", endedFn_next);

      let muted = tvDisplay.getContentProperty(contentJSON, "muted");

      if (!muted) {
        videoEle.removeAttribute("muted");
      }

      videoEle.play();
    },

    destroy: function() {
      try {
        videoEle.removeEventListener("ended", endedFn_next);
      } catch (e) {
        // ignore
      }
    }
  };
}());
