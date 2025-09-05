# komako-tracker

 Statistics tracker for [komako](https://komako.pw/) using [osu!komako api](https://github.com/osukomako/)

 ![Screenshot](https://pek.li/0ifqap.png)

 **Features:**

- Several Statistics from the api for all four modes
- Hide/Show each Statistic
- Redordering the Stats list to your likings
- Score Rank using self-hosted api (rank updates every ~30min, good enough)
- Exporting Stats to text files for use in OBS or other programs
- Savable Sessions
- Multiple Colour Themes
- Custom Colour Theme

## Download

You can find the newest version [here](https://github.com/respektive/osu-tracker/releases/latest) or on the [Releases](https://github.com/respektive/osu-tracker/releases) page.

Includes portable version for Windows aswell as an AppImage and binary files for Linux.

## Building

Clone the repo and cd into

```sh
git clone https://github.com/osukomako/komako-tracker
cd komako-tracker
```

Install modules

```sh
npm i
```

Build for Windows/Linux or run in dev mode

```sh
# Windows
npm run build-win
# Linux
npm run build-linux
# Dev
npm run dev
```

## Resources

This project uses resources from the following projects:

- [osu!resources](https://github.com/ppy/osu-resources), original gamemode icons
- [osu!web](https://github.com/ppy/osu-web), colour palettes
- [OsuOpenRoomsWeb](https://gitlab.com/WebFreak001/osu-open-rooms-web/), svg files of gamemode icons
- [Comfortaa](https://fonts.google.com/specimen/Comfortaa), font used for basically everything
