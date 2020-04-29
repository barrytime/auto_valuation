const getUTS = () => {
    return Math.round(new Date().getTime() / 1000);
};

const minusYearsUTS = years => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - years);
    return Math.round(date.getTime() / 1000);
};

module.exports = { getUTS, minusYearsUTS };
