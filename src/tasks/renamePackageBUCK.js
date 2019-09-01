import fs from "fs-extra";
import escapeRegExp from "escape-string-regexp";

import conditions from "./_conditionals";

const renamePackageBUCK = {
    name: "rename package inside BUCK",
    if: conditions.packageName,
    fn: async (data) => {
        const settings = String(await fs.readFile("android/app/BUCK"));
        const current = escapeRegExp(data.currentPackageName);
        const newBUCK = settings.replace(
            new RegExp(`package\\s*=\\s*"${current}"`, "g"),
            `package = "${data.newPackageName}"`,
        );
        if (settings !== newBUCK) {
            await fs.writeFile("android/app/BUCK", newBUCK);
            return;
        }
        throw new Error(`Cannot find current package name in BUCK`);
    },
};

export default renamePackageBUCK;
