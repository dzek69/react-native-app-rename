import path from "path";
import fs from "fs-extra";
import isEmptyDir from "empty-dir";
import last from "bottom-line-utils/dist/last";

import conditions from "./_conditionals";

const getParts = (name) => {
    const parts = name.split(".");
    const without = [...parts];
    without.length--;
    return [parts, without];
};

const moveAndroidJava = {
    name: "move Android java files",
    if: conditions.packageName,
    fn: async (data) => {
        const [sourceParts, sourcePartsWithout] = getParts(data.currentPackageName);
        const [targetParts, targetPartsWithout] = getParts(data.newPackageName);

        const sourceDir = path.join("android/app/src/main/java", ...sourcePartsWithout);
        const targetDir = path.join("android/app/src/main/java", ...targetPartsWithout);

        await fs.move(
            path.join(sourceDir, last(sourceParts)),
            path.join(targetDir, last(targetParts)),
        );

        while (sourcePartsWithout.length) {
            const dir = path.join("android/app/src/main/java", ...sourcePartsWithout);
            const isEmpty = await isEmptyDir(dir);
            if (!isEmpty) {
                break;
            }
            await fs.remove(dir);
            sourcePartsWithout.pop();
        }
    },
};

export default moveAndroidJava;
