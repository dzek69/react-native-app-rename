const conditions = {
    packageName: data => data.newPackageName !== data.currentPackageName,
    name: data => data.newName !== data.currentName,
    fullName: data => data.newFullName !== data.currentFullName,
};

export default conditions;
