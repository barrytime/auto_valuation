const { storeData } = require('./utils');
const { getFundamentals, getHistoricalPrices } = require('./api/yahoo');

const saveHistoricalPrices = ticker => {
    getHistoricalPrices('MSFT', 'mo', 10).then(res =>
        storeData(res, './data/priceResponse.json')
    );
};

saveHistoricalPrices('MSFT');
