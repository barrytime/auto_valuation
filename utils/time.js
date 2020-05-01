const getUTS = (dateString = false) => {
    if (!dateString) return Math.round(new Date().getTime() / 1000);

    return Math.round(Date.parse(dateString) / 1000);
};

const minusYearsUTS = years => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - years);
    return Math.round(date.getTime() / 1000);
};

function UTSConverter(UNIX_timestamp) {
    const date = new Date(UNIX_timestamp * 1000);
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const time =
        day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

module.exports = { getUTS, minusYearsUTS, UTSConverter };
