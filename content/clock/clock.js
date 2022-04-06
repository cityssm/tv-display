/* global window, tvDisplay, axios */

tvDisplay.tvContent = (function() {
  "use strict";

  let windowIntervalFn = null;
  let includeSeconds = false;

  let unixTimestampURL = "";
  let timeOffsetMilliseconds = 0;

  function getTimeOffset() {

    if (unixTimestampURL === "") {
      return;
    }

    axios.get(unixTimestampURL, {
        responseType: "text",
        withCredentials: false
      })
      .then(function(response) {
        return response.data;
      })
      .then(function(unixTimestamp) {
        try {
          timeOffsetMilliseconds = Date.now() - (Number.parseInt(unixTimestamp) * 1000) - (Date.getTimezoneOffset() * 60000);
        } catch (_e) {}
      });
  }

  const monthArray = ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const dayOfWeekArray = ["Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const timeEle = tvDisplay.contentContainer.getElementsByTagName("h1")[0];
  const dateEle = tvDisplay.contentContainer.getElementsByTagName("h2")[0];

  function padNumber(num) {
    return ("0" + num.toString()).slice(-2);
  }


  function updateClockDisplay() {

    let t = new Date(Date.now() - timeOffsetMilliseconds),
      tod = "AM",
      hr = t.getHours();

    if (hr >= 12) {
      tod = "PM";
      if (hr > 12) {
        hr -= 12;
      }
    } else if (hr === 0) {
      hr = 12;
    }

    timeEle.innerHTML = hr + ":" + padNumber(t.getMinutes()) +
      (includeSeconds ? ":" + padNumber(t.getSeconds()) : "") +
      " " + tod;

    dateEle.innerHTML = dayOfWeekArray[t.getDay()] + ",<br /><span class=\"text-nowrap\">" + monthArray[t.getMonth()] + " " + t.getDate() + ",</span> " + t.getFullYear();
  }


  return {
    init: function(contentJSON) {

      // get settings

      includeSeconds = tvDisplay.getContentProperty(contentJSON, "includeSeconds") || false;

      unixTimestampURL = tvDisplay.getContentProperty(contentJSON, "unixTimestampURL") || "";

      getTimeOffset();

      // refresh the clock

      updateClockDisplay();
      windowIntervalFn = window.setInterval(updateClockDisplay, 1 * 1000);

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
