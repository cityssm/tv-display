/* global window, document, tvDisplay */


tvDisplay.tvContent = (function() {
  "use strict";

  let player;

  function loadVideo(videoID) {

    player = new window.YT.Player("youtube-player", {
      height: "100%",
      width: "100%",
      videoId: videoID,
      playerVars: {
        rel: 0,
        modestbranding: 1
      },
      events: {
        onReady: function(readyEvent) {
          readyEvent.target.playVideo();
        },
        onStateChange: function(changeEvent) {
          if (changeEvent.data === window.YT.PlayerState.ENDED) {
            tvDisplay.next();
          }
        }
      }
    });
  }

  return {
    init: function(contentJSON) {

      const videoID = tvDisplay.getContentProperty(contentJSON, "videoID") || "";

      if (videoID === "") {
        tvDisplay.next();
        return;
      }

      if (tvDisplay.tvContent_youtube_scriptIsLoaded) {
        loadVideo(videoID);
      } else {

        let scriptEle = document.createElement("script");
        scriptEle.src = "https://www.youtube.com/iframe_api";
        document.body.insertAdjacentElement("beforeend", scriptEle);

        window.onYouTubeIframeAPIReady = function() {
          tvDisplay.tvContent_youtube_scriptIsLoaded = true;
          loadVideo(videoID);
        };
      }




    },
    destroy: function() {

      try {
        player.destroy();
        player = null;
      } catch (e) {
        // ignore
      }

      try {
        delete window.onYouTubeIframeAPIReady;
      } catch (e) {
        // ignore
      }
    }
  };
}());
