/* global window, document, URLSearchParams */
/* global axios */



const tvDisplay = (function() {
  "use strict";


  /*
   * CONFIGURATION
   */


  const urlParams = new URLSearchParams(window.location.search);

  const config = urlParams.get("config") || "default";

  let contentIndex = urlParams.get("index") || -1;
  let contentTimeoutFn = null;

  const configURL = "config/" + config + (config.indexOf(".") === -1 ? ".json" : "");

  let displayDefaults = {};
  let contentDefaults = {};
  let contentList = [];

  function getContentProperty(contentJSON, propertyName) {

    let propertyValue = contentJSON[propertyName];

    if (propertyValue === null && contentDefaults[contentJSON.contentType]) {
      propertyValue = contentDefaults[contentJSON.contentType][propertyName];
    }

    if (propertyValue === null) {
      propertyValue = displayDefaults[propertyName];
    }

    return propertyValue;
  }


  /*
   * POINTERS
   */


  const contentContainerEle = document.getElementsByTagName("main")[0];

  const footerEle = document.getElementsByTagName("footer")[0];


  footerEle.getElementsByClassName("float-left")[0].innerText = "⛭ " + config;
  footerEle.removeAttribute("hidden");


  /*
   * SHOW CONTENT
   */


  let contentFn_next, contentFn_display;


  contentFn_display = function() {

    const contentJSON = contentList[contentIndex];

    const contentURL = "content/" + contentJSON.contentType + "/html.txt";

    axios.get(contentURL, {
        responseType: "text"
      })
      .then(function(response) {
        return response.data;
      })
      .then(function(responseText) {

        // remove previous content

        if (tvDisplay.content) {

          if (tvDisplay.tvContent.destroy) {
            tvDisplay.tvContent.destroy();
          }

          delete tvDisplay.tvContent;
        }

        while (contentContainerEle.firstChild) {
          contentContainerEle.removeChild(contentContainerEle.firstChild);
        }

        // load new content

        contentContainerEle.innerHTML = responseText;

        const articleEle = contentContainerEle.getElementsByTagName("article")[0];

        if (articleEle) {

          // load content specific css

          if (articleEle.getAttribute("data-css") && articleEle.getAttribute("data-css") !== "") {
            contentContainerEle.insertAdjacentHTML("afterbegin",
              "<link rel=\"stylesheet\" type=\"text/css\" href=\"content/" + contentJSON.contentType + "/" + articleEle.getAttribute("data-css") + "\" />");
          }

          // set styles that apply on all content types

          const fontFamily = getContentProperty(contentJSON, "fontFamily");

          if (fontFamily) {
            articleEle.style.fontFamily = fontFamily;
          }

          const backgroundImage = getContentProperty(contentJSON, "backgroundImage");

          if (backgroundImage) {
            articleEle.style.backgroundImage = "url('" + backgroundImage + "')";
          }

          // load content specific javascript

          if (articleEle.getAttribute("data-js") && articleEle.getAttribute("data-js") !== "") {

            const scriptEle = document.createElement("script");
            scriptEle.src = "content/" + contentJSON.contentType + "/" + articleEle.getAttribute("data-js");
            scriptEle.onload = function() {

              if (tvDisplay.tvContent && tvDisplay.tvContent.init) {
                tvDisplay.tvContent.init(contentJSON);
              }
            };
            contentContainerEle.insertAdjacentElement("afterbegin", scriptEle);
          }
        }

        let displayMillis = (getContentProperty(contentJSON, "displaySeconds") || 60) * 1000;

        contentTimeoutFn = window.setTimeout(contentFn_next, displayMillis);
      })
      .catch(function() {
        // eslint-disable-next-line no-alert
        window.alert("Unable to load content: " + contentURL);
      });
  };


  contentFn_next = function() {

    if (contentTimeoutFn) {
      try {
        window.clearTimeout(contentTimeoutFn);
      } catch (e) {
        // ignore
      }
    }

    contentIndex += 1;

    if (contentIndex >= contentList.length) {
      contentIndex = 0;
    }

    contentFn_display();
  };


  /*
   * GET THE CONFIGURATION
   */


  function configFn_refresh(doContentDisplay) {

    axios.get(configURL, {
        responseType: "json"
      })
      .then(function(response) {
        return response.data;
      })
      .then(function(responseJSON) {

        contentList = responseJSON.contentList || [];
        contentDefaults = responseJSON.contentDefaults || {};
        displayDefaults = responseJSON.displayDefaults || {};

        if (doContentDisplay) {
          contentFn_next();
        }

      })
      .catch(function(err) {

        if (contentList.length === 0) {
          // eslint-disable-next-line no-alert
          window.alert("Unable to load config: " + configURL + "\n" +
            "\n" +
            err);
        }
      });
  }

  configFn_refresh(true);
  window.setInterval(configFn_refresh, 10 * 60 * 1000);


  /*
   * SET UP KEYS
   */


  window.addEventListener("keyup", function(keyupEvent) {

    const keyCode = (keyupEvent.which || keyupEvent.keyCode);

    switch (keyCode) {

      case 39: // right arrow
      case 40: // down arrow
      case 78: // n
        contentFn_next();
        break;

      case 82: // r
        configFn_refresh();
        break;

      default:
    }
  });


  document.getElementsByClassName("footer-btn-refresh")[0].addEventListener("click", function() {
    configFn_refresh(false);
  });

  document.getElementsByClassName("footer-btn-next")[0].addEventListener("click", contentFn_next);


  return {
    next: contentFn_next,
    refresh: configFn_refresh,
    getContentProperty: getContentProperty,
    contentContainer: contentContainerEle
  };
}());
