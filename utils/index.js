const time = require('./time');
const { storeData, loadData } = require('./files');
const formulas = require('./formulas');
const calcExpectedGrowth = require('./growth');
const { compareArrays } = require('./utils');

module.exports = {
    calcExpectedGrowth,
    compareArrays,
    time,
    storeData,
    loadData,
    formulas,
};
