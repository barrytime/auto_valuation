var colors = require('colors/safe');

const {
    loadData,
    parseFundamentals,
    time,
    formulas,
    valuation,
} = require('./utils');

const yahoo = require('./api/yahoo');

const fullReport = async ticker => {
    try {
        const resFundamentals = await yahoo.getFundamentals(ticker);
        const resPrice = await yahoo.getHistoricalPrices(ticker, 'mo', 6);
        const resCurrent = await yahoo.getRecentPrices(ticker);

        const currentPrice = resCurrent[0].meta.regularMarketPrice;

        const fundamentals = parseFundamentals(resFundamentals);

        const marginOfSafety = 0.5;
        const reqRoR = 0.15;
        const timeFrame = 10; // yrs

        const growth = formulas.expectedGrowth(fundamentals) * 0.75;

        const historicalPE = valuation.historicPE(resPrice, fundamentals);
        const ttmEPS = formulas.sumArray(fundamentals.quarterlyBasicEPS.values);
        const futurePE = Math.floor(
            (historicalPE.average + historicalPE.low) / 2
        );

        const futurePrice = valuation.futurePrice(
            ttmEPS,
            growth,
            timeFrame,
            futurePE
        );
        const fairValue = valuation.fairValue(futurePrice, reqRoR, timeFrame);
        const buyPrice = valuation.buyPrice(fairValue, marginOfSafety);

        console.log(`Fair Value Report for ${colors.green.bold(ticker)}`);
        console.log(`Current Price: ${colors.green(currentPrice)}`);
        console.log(`Future Price: ${colors.blue(futurePrice)}`);
        console.log(`Fair Value: ${colors.yellow(fairValue)}`);
        console.log(`Buy Price: ${colors.green.bold.underline(buyPrice)}`);
    } catch (err) {
        console.log(
            colors.red(
                'An Error occured\n Please verify you are using a valid ticker symbol on yahoo finance'
            )
        );
    }
};

if (process.argv[2]) {
    fullReport(process.argv[2]);
} else {
    console.log(
        colors.yellow(
            "No ticker specified. Format as follows: 'npm run report ${TICKER}'"
        )
    );
}
