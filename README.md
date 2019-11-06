# City Facility TV Displays

![Seniors TV Display at the Northern Community Centre](https://raw.githubusercontent.com/cityssm/tv-display-docs/master/realWorld/nccSeniors.jpg)

The City of Sault Ste. Marie uses an in-house system to display content on several display boards
located at various City facilities.  The most prominent display that uses the in-house system
is the one in the Civic Centre lobby.

This is not a digital signage or kiosk operating system, but rather a simple "webpage" that can run through a series of
content items.

As we expand our footprint, we are cleaning up the code associated with displaying the content,
and releasing it for the benefit of others.


## Sample Configurations

The content that is displayed is driven by a config file.  Config files are written in JSON.
They can be dynamically generated from a database table or other source, however, that implementation is not here (yet).

- [Sample configuration](https://cityssm.github.io/tv-display/?config=sample)
- [Sample clock with two display options](https://cityssm.github.io/tv-display/?config=sample-clock)
- [Sample image slideshow](https://cityssm.github.io/tv-display/?config=sample-image)


## Setup Instructions

The TV Display application can be run from pretty much any web server.
The application can be viewed from pretty much any web browser.

To avoid overloading this repository with heavy screenshots,
documentation can be found in its own repository, [cityssm/tv-display-docs](https://github.com/cityssm/tv-display-docs).
