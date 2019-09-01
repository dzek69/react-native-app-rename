import fs from "fs-extra";

import conditions from "./_conditionals";

const loadAppJson = async () => {
    let data = null,
        jsonPath;
    try {
        data = await fs.readFile("./app.json");
        jsonPath = "./app.json";
    }
    catch (e) { // eslint-disable-line no-unused-vars
        data = await fs.readFile("src/app.json");
        jsonPath = "src/app.json";
    }

    const json = JSON.parse(String(data));
    return {
        json,
        jsonPath,
    };
};

const updateAppJson = {
    name: "update short name inside app.json",
    if: conditions.name,
    fn: async (data) => {
        const { json, jsonPath } = await loadAppJson();
        if (!json) {
            throw new Error("Could not load app.json");
        }
        json.name = data.newName;
        json.displayName = data.newName;
        const JSON_INDENT = 2;
        await fs.writeFile(jsonPath, JSON.stringify(json, null, JSON_INDENT));
    },
};

export default updateAppJson;
