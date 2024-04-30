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

I'm not multilingual, so translations are ALWAYS welcome. You can look at `packages/i18n` to see the current state of internationalization and contribute!

### Current translations

- Spanish (credit @anjosmelanie and @amukasekon)
- French (credit @Honeyxilia)
- Brazilian Portuguese (credit @rebsilva)
- Russian (credit @hllwrld7)
- Indonesian (credit @a0z0u)
- Vietnamese (credit @xuanhaivptthn)
- German (credit @justjustie)
- Dutch (credit @SnooLuna)

### Adding translations

1. Navigate to `packages/i18n` and add your localization. Required fields are described in `index.d.ts`.
2. Once you've created your translations, ensure it is exported through `index.js` and declared in `index.d.ts` with `{language_lowercased_2_chars}{COUNTRY_UPPERCASED_2_CHARS}`.
3. Navigate to `packages/app/frontend/src/main.tsx` and update the switch `localeSwitch`
4. Open a pull request and I'll merge it in!
