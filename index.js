const { loadData, calcExpectedGrowth } = require('./utils');

const res = JSON.parse(loadData('./data/testResponse.json'));

const growth = calcExpectedGrowth(res);
