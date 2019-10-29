/* global tvDisplay */

tvDisplay.tvContent = (function() {
  "use strict";

  return {
    init: function(contentJSON) {

      const articleEle = tvDisplay.contentContainer.getElementsByTagName("article")[0];

      articleEle.style.alignItems = tvDisplay.getContentProperty(contentJSON, "alignItems") || "center";
      articleEle.style.justifyContent = tvDisplay.getContentProperty(contentJSON, "justifyContent") || "center";

      const divEle = articleEle.getElementsByTagName("div")[0];

      const divHTML = tvDisplay.getContentProperty(contentJSON, "innerHTML") || "";

      divEle.innerHTML = divHTML;
    }
  };
}());
