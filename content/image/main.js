/* global tvDisplay */


tvDisplay.tvContent = (function() {
  "use strict";

  return {
    init: function (contentJSON) {

      let backgroundImage = tvDisplay.getContentProperty(contentJSON, "backgroundImage") || "img/bg0.jpg";
      tvDisplay.contentContainer.getElementsByTagName("article")[0].style.backgroundImage = "url('" + backgroundImage + "')";
    }
  };
}());
