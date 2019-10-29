/* global tvDisplay */


tvDisplay.tvContent = (function() {
  "use strict";

  return {
    init: function(contentJSON) {

      const iframeEle = tvDisplay.contentContainer.getElementsByTagName("iframe")[0];

      const iframeSrc = tvDisplay.getContentProperty(contentJSON, "source") || "";

      iframeEle.src = iframeSrc;
    }
  };
}());
