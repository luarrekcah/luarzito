const fs = require('node:fs');

function checker(content) {
   fs.readFile('./utils/nsfwlist.txt', 'utf8', (err, data) => {
        if (err) throw err;
        const wordlist = data.replaceAll("\n", ",").replaceAll("\r", "").split(",");
        console.log(`includes? ${wordlist.includes(content)}`)
        return (wordlist.includes(content));
    });
}

module.exports = {checker};
