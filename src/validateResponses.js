const validateResponses = ({ newPackageName, newName, newFullName }) => {
    if (!newPackageName.includes(".")) {
        throw new TypeError("Package name should include at least one dot [.]");
    }
    if (newPackageName.includes("..")) {
        throw new TypeError("New package name seems to be invalid");
    }
    if (!newPackageName.match(/^[a-z\d.]+$/i)) {
        throw new TypeError("New package name seems to be invalid, use only a-z, 0-9 characters and dot");
    }
    if (!newName.match(/^[a-z\d]+$/i)) {
        throw new TypeError("New app short name seems to be invalid, use only a-z, 0-9 characters.");
    }
    if (!newName) {
        throw new TypeError("New app short name is required");
    }
    if (!newFullName) {
        throw new TypeError("New app full name is required");
    }
};

export default validateResponses;
