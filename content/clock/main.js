/* global window, document, tvDisplay */

tvDisplay.tvContent = (function() {
  "use strict";

  let windowIntervalFn = null;
  let includeSeconds = false;

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

  const timeEle = document.getElementsByTagName("h1")[0];
  const dateEle = document.getElementsByTagName("h2")[0];

  function padNumber(num) {
    return ("0" + num.toString()).slice(-2);
  }


  function updateClockDisplay() {

    let t = new Date(),
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

    dateEle.innerHTML = dayOfWeekArray[t.getDay()] + ", " + monthArray[t.getMonth()] + " " + t.getDate() + ", " + t.getFullYear();
  }


  return {
    init: function(contentJSON) {

      // get settings

      includeSeconds = tvDisplay.getContentProperty(contentJSON, "includeSeconds") || false;

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

      delete window.content;
    }
  };
}());
