const fs = require('fs');

const storeData = async (data, path) => {
    try {
        const dirPath = path
            .split('/')
            .slice(0, -1)
            .join('/');
        await fs.promises.mkdir(dirPath, { recursive: true });
        fs.writeFileSync(path, JSON.stringify(data));
    } catch (err) {
        console.error(err);
    }
};

const loadData = path => {
    try {
        return fs.readFileSync(path, 'utf8');
    } catch (err) {
        console.error(err);
        return false;
    }
};

module.exports = { storeData, loadData };
