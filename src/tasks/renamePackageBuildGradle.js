import fs from "fs-extra";
import escapeRegExp from "escape-string-regexp";

import conditions from "./_conditionals";

const renamePackageBuildGradle = {
    name: "rename package inside build.gradle",
    if: conditions.packageName,
    fn: async (data) => {
        const build = String(await fs.readFile("android/app/build.gradle"));
        const current = escapeRegExp(data.currentPackageName);
        const newBuild = build.replace(
            new RegExp(`applicationId "${current}"`),
            `applicationId "${data.newPackageName}"`,
        );
        if (build !== newBuild) {
            await fs.writeFile("android/app/build.gradle", newBuild);
            return;
        }
        throw new Error(`Cannot find current package name in build.gradle`);
    },
};

export default renamePackageBuildGradle;
