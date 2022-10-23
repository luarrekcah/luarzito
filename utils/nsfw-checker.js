const fs = require('node:fs');

module.exports = {
    checker: function (content) {
        const wordlist = fs.readFileSync('./utils/nsfwlist.txt', 'utf8')
            .replaceAll("\n", ",")
            .replaceAll("\r", "")
            .split(",");
        return (wordlist.includes(content.toLowerCase()));
    }
};
