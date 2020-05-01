const { compareArrays } = require('./utils');
const formulas = require('./formulas');

// Book Value
const getBookValue = dataObj => {
    try {
        const {
            annualCapitalStock: shares,
            annualStockholdersEquity: equity,
        } = dataObj;
        if (equity && shares && compareArrays(equity.dates, shares.dates)) {
            const bookValue = {
                dates: equity.dates,
                values: [],
                average: 0,
                avgChange: 0,
            };
            for (i = 0; i < equity.dates.length; i++) {
                bookValue.values.push(
                    formulas.bookValue(equity.values[i], shares.values[i])
                );
            }

            bookValue.average = formulas.average(bookValue.values);
            bookValue.avgChange = formulas.avgPctChange(bookValue.values);

            return bookValue;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

// Current ratio
const getCurrentRatio = dataObj => {
    try {
        const {
            annualCurrentAssets: curAssets,
            annualCurrentLiabilities: curLiabilities,
        } = dataObj;
        if (
            curAssets &&
            curLiabilities &&
            compareArrays(curAssets.dates, curLiabilities.dates)
        ) {
            const currentRatio = {
                dates: curAssets.dates,
                values: [],
                average: 0,
                avgChange: 0,
            };
            for (i = 0; i < curAssets.dates.length; i++) {
                currentRatio.values.push(
                    formulas.debtEquity(
                        curAssets.values[i],
                        curLiabilities.values[i]
                    )
                );
            }

            currentRatio.average = formulas.average(currentRatio.values);
            currentRatio.avgChange = formulas.avgPctChange(currentRatio.values);

            return currentRatio;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

// Debt/Equity
const getDebtEquity = dataObj => {
    try {
        const {
            annualCurrentLiabilities: curLiabilities,
            annualTotalNonCurrentLiabilitiesNetMinorityInterest: nonCurLiabilities,
            annualCurrentAssets: curAssets,
            annualTotalNonCurrentAssets: nonCurAssets,
        } = dataObj;
        if (
            curAssets &&
            nonCurAssets &&
            curLiabilities &&
            nonCurLiabilities &&
            compareArrays(curLiabilities.dates, nonCurLiabilities.dates) &&
            compareArrays(curAssets.dates, nonCurAssets.dates) &&
            compareArrays(curAssets.dates, curLiabilities.dates)
        ) {
            const debtEquity = {
                dates: curAssets.dates,
                values: [],
                average: 0,
                avgChange: 0,
            };
            for (i = 0; i < curAssets.dates.length; i++) {
                const totalAssets =
                    curAssets.values[i] + nonCurAssets.values[i];
                const totalLiabilities =
                    curLiabilities.values[i] + nonCurLiabilities.values[i];
                debtEquity.values.push(
                    formulas.debtEquity(totalLiabilities, totalAssets)
                );
            }

            debtEquity.average = formulas.average(debtEquity.values);
            debtEquity.avgChange = formulas.avgPctChange(debtEquity.values);

            return debtEquity;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

// return on invested capital
const getROIC = dataObj => {
    try {
        const {
            annualStockholdersEquity: equity,
            annualCurrentDebt: debt,
            annualLongTermDebt: ltDebt,
            annualNetIncome: netIncome,
            annualCashDividendsPaid: divs,
        } = dataObj;

        if (
            equity &&
            debt &&
            ltDebt &&
            netIncome &&
            compareArrays(equity.dates, debt.dates) &&
            compareArrays(ltDebt.dates, netIncome.dates) &&
            compareArrays(equity.dates, netIncome.dates)
        ) {
            const ROIC = {
                dates: equity.dates,
                values: [],
                average: 0,
                avgChange: 0,
            };
            for (i = 0; i < equity.dates.length; i++) {
                let div = divs ? Math.abs(divs.values[i]) : 0;

                ROIC.values.push(
                    formulas.roic(
                        netIncome.values[i],
                        div,
                        debt.values[i] + ltDebt.values[i],
                        equity.values[i]
                    )
                );
            }

            ROIC.average = formulas.average(ROIC.values);
            ROIC.avgChange = formulas.avgPctChange(ROIC.values);

            return ROIC;
        } else {
            return 1;
        }
    } catch (err) {
        console.log(err);
        return 2;
    }
};

const parseFundamentals = response => {
    const columns = {};
    const colsToInvert = [
        'annualCurrentDebt',
        'annualLongTermDebt',
        'annualCurrentLiabilities',
        'annualTotalNonCurrentLiabilitiesNetMinorityInterest',
    ];
    // clean data into columns array
    response.forEach(col => {
        const type = col.meta.type[0];
        const data = col[type];
        const dateArray = [];
        const valueArray = [];

        data.forEach(d => {
            if (d === null) return;
            valueArray.push(d.reportedValue.raw);
            dateArray.push(d.asOfDate);
        });

        if (valueArray.length > 0) {
            // find average % change
            const average = formulas.average(valueArray);
            let avgChange = formulas.avgPctChange(valueArray);
            if (colsToInvert.includes(type)) avgChange = -avgChange;

            columns[type] = {
                dates: dateArray,
                values: valueArray,
                average,
                avgChange,
            };
        }
    });

    columns.bookValue = getBookValue(columns);
    columns.currentRatio = getCurrentRatio(columns);
    columns.debtEquity = getDebtEquity(columns);
    columns.ROIC = getROIC(columns);

    return columns;
};

module.exports = parseFundamentals;
