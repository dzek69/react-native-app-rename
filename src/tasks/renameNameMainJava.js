import path from "path";
import fs from "fs-extra";

import conditions from "./_conditionals";

const renameNameMainJava = {
    name: "rename short name inside MainActivity.java",
    if: conditions.name,
    fn: async (data) => {
        const targetParts = data.newPackageName.split(".");
        const targetDir = path.join("android/app/src/main/java", ...targetParts);

        const filePath = path.join(targetDir, "MainActivity.java");
        const contents = String(await fs.readFile(filePath));

        const newContents = contents.replace(
            `return "${data.currentName}"`,
            `return "${data.newName}"`,
        );
        if (contents !== newContents) {
            await fs.writeFile(filePath, newContents);
            return;
        }
        throw new Error(`Cannot find current short name in MainActivity.java`);
    },
};
export default renameNameMainJava;
