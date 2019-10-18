# How to Setup a TV Display using Raspbian on a Raspberry Pi

The instructions below describe the process of setting up a Raspberry Pi running Raspbian machine to run the TV Display.

Similar to the [Linux Mint setup instructions](SETUP-linuxMint.md), the instructions below include details for two types of installations,
depending on where the TV Display application is hosted.

- If the display machine will have good network connectivity,
  the TV Display application can be hosted from a web server running on a different computer.
  This is best if multiple displays will be used as the configuration can be centralized.

- If network connectivity will be an issue, or if only one display is needed,
  the TV Display application can run on the Raspberry Pi itself.
  There are additional steps to run a *local installation*, but it's still pretty easy.


## Prerequisites

- A Raspberry Pi computer running Raspbian.  (See the [Raspbian Installation Guide](https://www.raspberrypi.org/downloads/raspbian/) for assistance.)
- A network connection for the setup process.
  Once set up, the machine should be able to run offline if the local installation steps are followed.


## Update the Pi

To ensure things run smoothly, it's best to update all of the software on the computer to it's latest versions.

*Important Note: Only type the terminal commands as they appear after the $ symbol.*

Open a Terminal, and run:

```bash
$  sudo apt-get update
$  sudo apt-get upgrade
```

Install all available updates.


## Install Additional Software

In the Terminal, run:

```bash
$  sudo apt-get install chromium chromium-codecs-ffmpeg chromium-codecs-ffmpeg
$  sudo apt-get install xscreensaver
$  sudo apt-get install unclutter
```

### Local Installations Only

```bash
$  sudo apt-get install geany
$  sudo apt-get install git
$  sudo apt-get install nginx-light
$  sudo apt-get install openjdk-11-jre
```

## Install and Configure the TV Display Application (Local Installations Only)

*If you're installing the TV Display application on another server,
documentation is coming, but will be very similar to the steps described below.*

The default folder location for nginx on Raspbian is `/var/www/html`.  Go to that directory.

```bash
$  cd /var/www/html
```

Clone the tv-display repository.

```bash
/var/www/html $
  sudo git clone https://github.com/cityssm/tv-display.git
```

If successful, you should now be able to view the default configuration by visiting
http://localhost/tv-display

Make a directory for the display's custom content.

```bash
/var/www/html $
  sudo mkdir tv-assets

/var/www/html $
  sudo chmod 777 tv-assets
```

For help getting started, copy over `template-offline.json` from the `tv-display/config` directory.
This template makes it easy to run through three groups of images (imageList content)
while displaying a clock in between.

```bash
/var/www/html $
  cd tv-assets

/var/www/html/tv-assets $
  cp ../tv-display/config/template-offline.json config.json
```

For easier refreshing of the imageList `files.json` files, download the
`FilesJsonGenerator.jar` from the [cityssm/tv-display/filesJSON repository](https://github.com/cityssm/tv-display-filesJSON).

```bash
/var/www/html/tv-assets $
  wget https://github.com/cityssm/tv-display-filesJSON/raw/master/dist/FilesJsonGenerator.jar

/var/www/html/tv-assets $
  wget https://github.com/cityssm/tv-display-filesJSON/raw/master/dist/generateFilesJSON.sh
```


## Launch Chromium on Startup

```bash
$  mkdir /home/pi/.config/autostart
$  nano /home/pi/.config/autostart/chromium.desktop
```

Using the nano editor, create a file with the following text.

```text
[Desktop Entry]
Type=Application
Name=Chromium
Exec=chromium-browser http://localhost/tv-display/?config=/tv-assets/config --start-fullscreen --kiosk --noerrdialogs --disable-translate --no-first-run --fast --fast-start --disable-infobars  --password-store=basic
```

Use <kbd>Ctrl</kbd> <kbd>O</kbd> to save the file.  Use <kbd>Ctrl</kbd> <kbd>X</kbd> to exit.


## Disable the Screensaver

In the Raspbian menu under Preferences, look for Screensaver.

Under the "Display Modes" tab, look for the "Mode" dropdown list.  Select "Disable Screen Saver".


## Restart the Computer

On restart, the Pi should load up the display with the configuration you copied over.
Use <kbd>Alt</kbd> <kbd>F4</kbd> to leave the full screen Chromium browser.

Now it's time to start customizing your content with the `config.json` file.
(Documentation is the works.)


## Appendix - Updating the TV Display Application (Local Installations Only)

Is there a new feature or bug fix you need for the TV Display application?

Connect the machine to the Internet and open a Terminal.
The following command will download the latest code from GitHub.

```bash
$  cd /var/www/html/tv-display
/var/www/html/tv-display$  sudo git pull origin master
```

While you're connected to a network, visit the **Update Manager** application as well to get the latest updates for your machine in general.
