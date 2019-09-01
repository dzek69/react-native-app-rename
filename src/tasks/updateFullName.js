import fs from "fs-extra";
import cheerio from "cheerio";

import conditions from "./_conditionals";

const updateFullName = {
    name: "update full name inside strings.xml",
    if: conditions.fullName,
    fn: async (data) => {
        const xml = String(await fs.readFile("android/app/src/main/res/values/strings.xml"));
        const $ = cheerio.load(xml, { xmlMode: true });
        $("string[name=app_name]").text(data.newFullName);
        await fs.writeFile("android/app/src/main/res/values/strings.xml", $.html());
    },
};

export default updateFullName;
