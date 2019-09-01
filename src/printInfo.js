const ISSUES_LINK = "https://github.com/dzek69/react-native-app-rename/issues";

const printInfo = () => {
    console.info("== React Native app rename ==");
    console.info("");
    console.info("MAKE SURE TO HAVE A BACKUP BEFORE PROCEEDING");
    console.info("");
    console.info("This application should do no harm to your files, but no guarantees are given from author");
    console.info("This application asks your for current app values to double confirm it's not breaking anything");
    console.info("If anything bad happen - please file a bug report at: " + ISSUES_LINK);
    console.info("");
    console.info("Dictionary:");
    console.info("- short name is the name you've used when creating your app with `react-native init NAME_HERE`");
    console.info("  it is used as dirname prefixes for iOS files and somewhere in the Android config files as well");
    console.info("- package name is kind of ID for Android applications, once picked it should be constant");
    console.info("  it's usually in form of: com.company.appName");
    console.info("- full name is the name your app has near it's icon in app drawer");
    console.info();
};

export default printInfo;
