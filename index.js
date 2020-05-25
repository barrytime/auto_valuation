var colors = require('colors/safe');

const yahoo = require('./api/yahoo');
const fairValue = require('./valuation/value01');

if (process.argv[2]) {
    const ticker = process.argv[2];

    (async () => {
        const fundamentals = await yahoo.getFundamentals(ticker);
        const price = await yahoo.getHistoricalPrices(ticker, 'mo', 6);
        const recentPrices = await yahoo.getRecentPrices(ticker);

        fairValue(ticker, fundamentals, price, recentPrices);
    })();
} else {
    console.log(
        colors.yellow(
            "No ticker specified. Format as follows: 'npm run report ${TICKER}'"
        )
    );
}
