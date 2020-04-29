const compareArrays = (arr1, arr2) => {
    if (typeof arr1 !== typeof arr2) return false;
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }

    return true;
};

module.exports = {
    compareArrays,
};
