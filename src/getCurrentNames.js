import fs from "fs-extra";
import cheerio from "cheerio";

const getCurrentFullName = async () => {
    const xml = String(await fs.readFile("android/app/src/main/res/values/strings.xml"));
    const $ = cheerio.load(xml);
    return $("string[name=app_name]").text();
};

const getCurrentName = async () => {
    const settings = String(await fs.readFile("android/settings.gradle"));
    const matches = settings.match(/rootProject.name\s*=\s*'([^']+)'/);
    if (!matches) {
        return "";
    }
    return matches[1];
};

const getCurrentPackage = async () => {
    const xml = String(await fs.readFile("android/app/src/main/AndroidManifest.xml"));
    const $ = cheerio.load(xml);
    return $("manifest").attr("package");
};

const getCurrentNames = () => {
    return Promise.all([
        getCurrentFullName(),
        getCurrentName(),
        getCurrentPackage(),
    ]);
};

export default getCurrentNames;
