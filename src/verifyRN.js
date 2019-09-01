import fs from "fs-extra";

const verifyRN = async () => {
    try {
        const pkg = String(await fs.readFile("./package.json"));
        const data = JSON.parse(pkg);

        if (!data.dependencies["react-native"] && !data.devDependencies["react-native"]) {
            throw new Error("");
        }
    }
    catch (e) { // eslint-disable-line no-unused-vars
        throw new Error("Current working directory doesn't seem to include React Native application code");
    }
};

export default verifyRN;
