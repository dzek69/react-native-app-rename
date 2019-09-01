#!/usr/bin/env node

import printInfo from "./printInfo";
import getCurrentNames from "./getCurrentNames";
import validateResponses from "./validateResponses";
import moveAndroidJava from "./tasks/moveAndroidJava";
import renamePackageManifest from "./tasks/renamePackageManifest";
import renamePackagesJavaFiles from "./tasks/renamePackageJavaFiles";
import renamePackageBUCK from "./tasks/renamePackageBUCK";
import renamePackageBuildGradle from "./tasks/renamePackageBuildGradle";
import renameNameSettingsGradle from "./tasks/renameNameSettingsGradle";
import renameNameMainJava from "./tasks/renameNameMainJava";
import updateFullName from "./tasks/updateFullName";
import updateAppJson from "./tasks/updateAppJson";
import askQuestions from "./askQuestions";
import verifyRN from "./verifyRN";
import printStatus from "./printStatus";

const tasks = [
    moveAndroidJava,
    renamePackageManifest,
    renamePackagesJavaFiles,
    renamePackageBUCK,
    renamePackageBuildGradle,
    renameNameSettingsGradle,
    renameNameMainJava,
    updateFullName,
    updateAppJson,
];

const rename = async (data) => { // eslint-disable-line max-statements
    let fails = 0,
        oks = 0;

    for (let i = 0; i < tasks.length; i++) {
        const item = tasks[i];
        console.info("- " + item.name);
        if (!item.if(data)) {
            console.info("✔ skipped, not needed");
            continue;
        }
        try {
            const stepResults = await item.fn(data);
            if (Array.isArray(stepResults)) {
                stepResults.forEach(({ name, result }) => { // eslint-disable-line no-loop-func
                    console.info("  - " + name);
                    if (result instanceof Error) {
                        console.info("    ✖ this step failed");
                        fails++;
                        return;
                    }
                    console.info("    ✔ ok");
                    oks++;
                });
                continue;
            }
            console.info("  ✔ ok");
            oks++;
        }
        catch (e) {
            console.info("  ✖ this step failed");
            fails++;
            console.warn(e);
        }
    }

    return {
        fails, oks,
    };
};

(async () => {
    try {
        await verifyRN();

        printInfo();
        const [fullName, name, packageName] = await getCurrentNames();
        const namesData = await askQuestions({ fullName, name, packageName });

        console.info();
        validateResponses(namesData);
        const results = await rename(namesData);

        printStatus(results);
    }
    catch (e) {
        console.error(e.message);
    }
})();
