# react-native-app-rename

CLI tool to rename your React Native project and change application ID.

> Note: Currently only Android parts of the code is supported. I have no Apple devices so I cannot really test if
potential-future versions with iOS support will work as expected. Feel free to open a PR with iOS support.

## Usage

1) Install globally or use with `npx`.
2) Change working directory to your app directory where package.json is placed
    1) if installed globally use `rn-rename` or `react-native-app-rename`
    2) if you're gonna use npx run `npx react-native-app-rename`
4) Answer some questions
5) Enjoy your app with a brand new name and ID!

## TODO

- add support for all java files inside android/src/main/java/(...)
- verify is support for java files inside android/src/(debug|release)/java/(...)
- add support for AndroidManifest inside android/src/(debug|release) dir

## License

MIT 
