const formulas = require('./formulas');
const time = require('./time');

const futurePrice = (eps, growth, timeFrame, futurePE) =>
    (
        parseFloat(eps) *
        Math.pow(1 + parseFloat(growth), parseFloat(timeFrame)) *
        parseFloat(futurePE)
    ).toFixed(2);

const fairValue = (futurePrice, ror, timeFrame) =>
    (
        parseFloat(futurePrice) /
        parseFloat(Math.pow(1 + parseFloat(ror), timeFrame))
    ).toFixed(2);

const buyPrice = (fairValue, marginOfSafety) =>
    (parseFloat(fairValue) * parseFloat(marginOfSafety)).toFixed(2);

const historicPE = (priceRes, fundamentals) => {
    const epsTS = fundamentals['annualBasicEPS'].dates.reduce((arr, date) => {
        arr.push(time.getUTS(date));
        return arr;
    }, []);

    const peArray = [];

    priceRes[0].timestamp.forEach((ts, i) => {
        const high = priceRes[0].indicators.quote[0].high[i];
        const low = priceRes[0].indicators.quote[0].low[i];
        const open = priceRes[0].indicators.quote[0].open[i];
        const close = priceRes[0].indicators.quote[0].close[i];
        epsTS.forEach((tts, ii) => {
            const eps = fundamentals['annualBasicEPS'].values[ii];
            if (ts >= tts && ts < epsTS[ii + 1]) {
                peArray.push(parseFloat((high / eps).toFixed(2)));
                peArray.push(parseFloat((low / eps).toFixed(2)));
                peArray.push(parseFloat((open / eps).toFixed(2)));
                peArray.push(parseFloat((close / eps).toFixed(2)));
            } else if (ts >= tts && !epsTS[ii + 1]) {
                peArray.push(parseFloat((high / eps).toFixed(2)));
                peArray.push(parseFloat((low / eps).toFixed(2)));
                peArray.push(parseFloat((open / eps).toFixed(2)));
                peArray.push(parseFloat((close / eps).toFixed(2)));
            }
        });
    });

    return {
        average: formulas.average(peArray, 2),
        high: formulas.highest(peArray),
        low: formulas.lowest(peArray),
    };
};

module.exports = {
    historicPE,
    futurePrice,
    fairValue,
    buyPrice,
};
