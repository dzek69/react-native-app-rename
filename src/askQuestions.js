import Question from "./Question";

const askQuestions = async ({ fullName, name, packageName }) => {
    const q = new Question();

    const currentFullName = await q.ask("Current full name", fullName);
    const currentName = await q.ask("Current short name", name);
    const currentPackageName = await q.ask("Current package name", packageName);

    const newFullName = await q.ask("Desired FULL app name", currentFullName + 1);
    const newName = await q.ask("Desired short name", currentName + 1);
    const newPackageName = await q.ask("Desired package name", currentPackageName + 1);

    q.close();

    return {
        currentFullName,
        currentName,
        currentPackageName,
        newFullName,
        newName,
        newPackageName,
    };
};

export default askQuestions;
