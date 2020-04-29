const { getFundamentals, getHistoricalPrices } = require('./api/yahoo');

getHistoricalPrices('MSFT', 'mo', 10).then(res => console.log(res[0]));
