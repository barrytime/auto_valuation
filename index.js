var colors = require('colors/safe');

const report = require('./valuation/value01');

if (process.argv[2]) {
    report(process.argv[2]);
} else {
    console.log(
        colors.yellow(
            "No ticker specified. Format as follows: 'npm run report ${TICKER}'"
        )
    );
}
