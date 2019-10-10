# City Facility TV Displays

The City of Sault Ste. Marie uses an in-house system to display content on several display boards
located at various City facilities.  The most prominent display that uses the in-house system
is the one in the Civic Centre lobby.

This is not a digital signage or kiosk operating system, but rather a simple "webpage" that can run through a series of
content items.  We are running this solution with different configurations on several different platforms, including:

- Windows XP running Internet Explorer 11
- Raspbian (Linux on a Raspberry Pi) running Midori
- SanicKiosk (Linux kiosk OS) running Opera 12

As we expand our footprint, we are cleaning up the code associated with displaying the content,
and releasing it for the benefit of others.

## Sample Configurations

The content that is displayed is driven by a config file.  Config files are written in JSON.
They can be dynamically generated from a database table or other source, however, that implementation is not here (yet).


- [Default Configuration](https://cityssm.github.io/tv-display/)
- [Sample clock with two display options](https://cityssm.github.io/tv-display/?config=sample-clock)
- [Sample image slideshow](https://cityssm.github.io/tv-display/?config=sample-image)
