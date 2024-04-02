# MTGCards 1.0
   
   **Date:** **16/10/19**
   **Author : Sergio Barrio Slocker**

**----------------------------------------------------------**

- Initial release of the MTG card viewer app.
- This app allows users to browse through MTG cards and filter them by name and/or color.
- Since the API is a bit unreliable or at least not very fast at times there is an option to load some locally stored data so users can test the card browsing experience.

**----------------------------------------------------------**

**Setup**

- On the console, browser to the root projecto folder /MTGCards and run:

   npm install

**Running**

- iOS (Simulator)

On the project's root folder run the following:

   react-native run-ios

- iOS (Real hardware)

NOTE: You will need a valid Apple Developer Account set on XCode and selected under the Signing & Capabilites tab on the general project settings in order for this to work.
In case you want to run the app on a real device navigate to the subfolder ios (inside this project) and open up the file MTGCards.xcworkspace.
Once on XCode, select your target device and press on the run button.
If you want to test a production build go to Product > Scheme > Edit Scheme and change the Build configuration from Debug to Release.
Once this is done you can select your real device on the target selector and press the run button.
After the project has compiled a production version the app should quickly be installed and launched on your device.

- Android (Emulated and real hardware)

On the project's root folder run the following:

   react-native run-android

NOTE : You will need to have either a developer-enabled Android device connected to your computer or an emulator (AVD or Genymotion virtualized machine, for example) in order for this to run.


