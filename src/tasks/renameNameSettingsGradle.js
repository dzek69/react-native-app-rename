import fs from "fs-extra";
import escapeRegExp from "escape-string-regexp";

import conditions from "./_conditionals";

const renameNameSettingsGradle = {
    name: "rename short name inside settings.gradle",
    if: conditions.name,
    fn: async (data) => {
        const settings = String(await fs.readFile("android/settings.gradle"));
        const current = escapeRegExp(data.currentName);
        const newSettings = settings.replace(
            new RegExp(`rootProject.name\\s*=\\s*['"]${current}['"]`),
            `rootProject.name = '${data.newName}'`,
        );
        if (settings !== newSettings) {
            await fs.writeFile("android/settings.gradle", newSettings);
            return;
        }
        throw new Error(`Cannot find current short name in settings.gradle`);
    },
};

export default renameNameSettingsGradle;
