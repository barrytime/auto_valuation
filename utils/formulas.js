const average = array => {
    return parseFloat(
        (array.reduce((sum, x) => sum + x) / array.length).toFixed(4)
    );
};

const avgPctChange = array => {
    try {
        if (array.length > 1) {
            let prev = false;
            const changeArray = [];

            array.forEach(num => {
                if (prev) {
                    let pctChange = (num - prev) / prev;
                    changeArray.push(pctChange);
                }
                prev = num;
            });

            return average(changeArray);
        }
    } catch (err) {
        return 0;
    }
};

const bookValue = (equity, shares) => parseFloat((equity / shares).toFixed(4));

const currentRatio = (curAssets, curLiabilities) =>
    parseFloat((curAssets / curLiabilities).toFixed(4));

const debtEquity = (totalLiabilities, assets) =>
    parseFloat((totalLiabilities / assets).toFixed(4));

const roic = (netIncome, dividend, debt, equity) =>
    parseFloat(((netIncome - dividend) / (debt + equity)).toFixed(4));

const expectedGrowth = data => {
    const categories = [
        'annualNetIncome',
        'quarterlyEbitda',
        'annualCashDividendsPaid',
        'quarterlyNetIncome',
        'annualTotalNonCurrentAssets',
        'annualStockholdersEquity',
        'annualFreeCashFlow',
        'annualEbitda',
        'quarterlyFreeCashFlow',
        'annualCurrentAssets',
        'annualTotalRevenue',
        'annualBasicEPS',
        'bookValue',
        'ROIC',
    ];

    const badCategories = [
        'annualCurrentDebt',
        'annualLongTermDebt',
        'annualCurrentLiabilities',
        'annualTotalNonCurrentLiabilitiesNetMinorityInterest',
    ];

    const growthArray = [];
    const lossArray = [];

    categories.forEach(cat => {
        growthArray.push(data[cat].avgChange);
    });
    badCategories.forEach(cat => {
        lossArray.push(data[cat].avgChange);
    });

    const growth = average(growthArray);

    const loss = average(lossArray);

    return (growth + growth * loss).toFixed(4);
};

module.exports = {
    average,
    avgPctChange,
    bookValue,
    currentRatio,
    debtEquity,
    roic,
    expectedGrowth,
};
