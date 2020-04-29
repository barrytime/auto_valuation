const axios = require('axios');
const { time } = require('../utils');

const getFundamentals = async ticker => {
    const columns = [
        'annualTotalRevenue', //revenue
        'annualBasicEPS', //eps
        'annualStockholdersEquity', //equity
        'annualFreeCashFlow', //free cash flow
        'quarterlyFreeCashFlow', //fcf quarterly
        'annualNetIncome', //net income
        'quarterlyNetIncome', //net income quarterly
        'annualCashDividendsPaid', //dividend
        'annualCurrentDebt', //cur debt
        'annualLongTermDebt', //LT debt
        'annualCurrentAssets', // cur assets
        'annualTotalNonCurrentAssets', //LT assets
        'annualCurrentLiabilities', //cur liabilities
        'annualTotalNonCurrentLiabilitiesNetMinorityInterest', //LT liabilities
        'annualCapitalStock', //common stock
        'annualEbitda', //EBITDA
        'quarterlyEbitda', //EBITDA quarterly
    ];

    const colString = columns.join('%2C');

    // periods
    const p1 = time.minusYearsUTS(10);
    const p2 = time.getUTS();

    const url = `https://query2.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/MSFT?lang=en-CA&region=CA&symbol=MSFT&padTimeSeries=true&type=${colString}&merge=false&period1=${p1}&period2=${p2}`;

    const res = await axios.get(url);

    return res.data.timeseries.result;
};

const getHistoricalPrices = async (ticker, interval, years) => {
    //interval d, wk, mo

    const p1 = time.minusYearsUTS(years);
    const p2 = time.getUTS();

    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${ticker}?formatted=true&lang=en-CA&region=CA&interval=1${interval}&period1=${p1}&period2=${p2}`;

    const res = await axios.get(url);

    return res.data.chart.result;
};

module.exports = { getFundamentals, getHistoricalPrices };
