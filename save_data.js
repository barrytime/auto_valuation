const colors = require('colors/safe');
const { storeData } = require('./utils');
const {
    getFundamentals,
    getHistoricalPrices,
    getRecentPrices,
} = require('./api/yahoo');

const saveHistoricalPrices = ticker => {
    getHistoricalPrices('MSFT', 'mo', 10).then(res => {
        const file = './data/price.json';
        storeData(res, file);
        console.log(`Saving Historical Price Data to ${colors.green(file)}`);
    });
};

const saveFundamentals = ticker => {
    getFundamentals('MSFT').then(res => {
        const file = './data/fundamentals.json';
        storeData(res, file);
        console.log(`Saving Fundamentals Data to ${colors.green(file)}`);
    });
};

const saveRecent = ticker => {
    getRecentPrices('MSFT').then(res => {
        const file = './data/recent.json';
        storeData(res, file);
        console.log(`Saving Recent Price Data to ${colors.green(file)}`);
    });
};

if (process.argv[2]) {
    try {
        const ticker = process.argv[2];
        saveHistoricalPrices(ticker);
        saveFundamentals(ticker);
        saveRecent(ticker);
    } catch (err) {
        console.log(
            colors.red(
                "Something went wrong. Format as follows: 'npm run saveData ${TICKER}'"
            ),
            err
        );
    }
} else {
    console.log(
        colors.yellow(
            "No ticker specified. Format as follows: 'npm run saveData ${TICKER}'"
        )
    );
}
