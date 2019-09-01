import fs from "fs-extra";
import cheerio from "cheerio";

import conditions from "./_conditionals";

const renamePackageManifest = {
    name: "rename package inside AndroidManifest.xml",
    if: conditions.packageName,
    fn: async (data) => {
        // @TODO support for manifest in debug and release as well
        const xml = String(await fs.readFile("android/app/src/main/AndroidManifest.xml"));
        const newXml = xml.replace(`package="${data.currentPackageName}"`, `package="${data.newPackageName}"`);
        if (xml !== newXml) {
            await fs.writeFile("android/app/src/main/AndroidManifest.xml", newXml);
            return;
        }

        // most basic option failed, let's try full parsing
        const $ = cheerio.load(xml, { xmlMode: true });
        $("manifest").attr("package", data.newPackageName);
        await fs.writeFile("android/app/src/main/AndroidManifest.xml", $.html());
    },
};

export default renamePackageManifest;
