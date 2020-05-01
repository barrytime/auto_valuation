const {
    loadData,
    parseFundamentals,
    time,
    formulas,
    valuation,
} = require('./utils');

const resFundamentals = JSON.parse(loadData('./data/testResponse.json'));
const resPrice = JSON.parse(loadData('./data/priceResponse.json'));

const fundamentals = parseFundamentals(resFundamentals);
const growth = formulas.expectedGrowth(fundamentals);

console.log(valuation.historicPE(resPrice, fundamentals));
