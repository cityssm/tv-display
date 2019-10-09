# New Content Types

Pull requests are **definitely welcome**.

It's great to see new types of content displayed on a big screen, or even the same kind of content displayed in different ways.
When adding new content types, try to keep a few things in mind.

- If the content type you're looking to create can be made by adding some additional properties to an existing content type,
  it's probably best to update to already existing one.
  
- If the content type is similar to an existing content type, try to use the same property names in the configuration file.
  That will allow for easier switching between your new content type and the existing one.
  
- Although browser compatibility is less strict for content types, try to maintain compatibility 
  with as many popular kiosk browsers as you can.

# The Display Itself

Pull requests are **definitely welcome**.

This is the code that manages the display itself.  The code that loads configuration files, loads content, removes content,
and keeps the display running.  The code for this area has some additional requirements.

- Maintain compatibility with the popular "kiosk" browsers.  This includes Opera 12 (before it adopted Chromium)
  and Internet Explorer 11 (ya, I know).

