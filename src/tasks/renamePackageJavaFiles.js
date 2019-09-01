import path from "path";
import fs from "fs-extra";

import conditions from "./_conditionals";

const renameFile = async ({ targetDir, file, data }) => {
    const result = { name: file };

    const contents = String(await fs.readFile(path.join(targetDir, file)));
    const newContents = contents.replace(
        `package ${data.currentPackageName};`,
        `package ${data.newPackageName};`,
    );
    if (contents !== newContents) {
        await fs.writeFile(path.join(targetDir, file), newContents);
        result.result = true;
        return result;
    }
    result.result = new Error(`Cannot find current package name in ${file}`);
    return result;
};

const renamePackagesJavaFiles = {
    name: "rename package inside java files",
    if: conditions.packageName,
    fn: async (data) => {
        // @TODO support for deeply located java files?
        const targetParts = data.newPackageName.split(".");
        const targetDir = path.join("android/app/src/main/java", ...targetParts);

        const results = [];

        const files = ["MainActivity.java", "MainApplication.java"];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            results.push(await renameFile({ targetDir, file, data }));
        }
        return results;
    },
};

export default renamePackagesJavaFiles;
