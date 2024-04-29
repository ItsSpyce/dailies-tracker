# Dailies Tracker

## WIP

## Architecture

### Source of truth

The first time you set up the app on your device, that device will be seen as the source of truth. Any subsequent connections to that data will be seen as secondary sources. What this looks like in terms of data is:

1. Device gets registered as source of truth, creating a one-of-a-kind ticket key.
2. When the device is asked to generate a connecting ticket (via QR code), it will submit to the server a token that will then be one time use to sync.
3. Any changes that occur on either end will then sync to other devices with the matching token.

### UI

The UI for both the app and the web-version are built on a shared React library using:

- styled-components
- feather icons
- MDXEditor
- react-calendar
- react-modal

### App

The app is built using Wails (Go backend, Web front-end)

### Web

TBD :)

## Translation help

I'm not multilingual, so translations are ALWAYS welcome. You can look at `packages/app/frontend/src/i18n` to see the current state of internationalization and contribute!
