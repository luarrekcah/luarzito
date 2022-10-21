const fs = require('node:fs');

const checker = (content) => {
    fs.readFile('./utils/nsfwlist.txt', 'utf8', function(err, data) {
        if (err) throw err;
        const wordlist = data.replaceAll("\n", ",").replaceAll("\r", "").split(",");
        console.log(wordlist);
        if(wordlist.includes(content)) return true;
        else return false;
      });
}

module.exports = checker;