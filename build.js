let fs = require('fs');

(function build () {
    let spec = fs.readFileSync(`${__dirname}\\.buildmap`, 'utf-8').split('\n').map(l => l.replace(/\s+/g,''));
    for (var i = 0; i < spec.length; i++) {
        let line = spec[i];
        if (/^.+(\\|\/)\*$/.test(line)) {
            console.log(/^(.+)(\\|\/)\*$/.exec(line)[1]);
            let base = /^(.+)(\\|\/)\*$/.exec(line)[1];
            let list = fs.readdirSync(base).map(ll => `${base}\\${ll}`);
            spec.splice(i, 1);
            i--;
            spec = spec.concat(list);
        }
    }
    let mapping = spec.map(line => {
        let txt = `/** SECTION: ${line} **/\n\n`;
        if (/^.+\(\)$/.test(line)) {
            txt += require(`${__dirname}\\${/^(.+)\(\)$/.exec(line)[1]}`)(spec);
        }
        else {
            txt += fs.readFileSync(`${__dirname}\\${line}`, 'utf-8');
        }
        return txt;
    });
    let txt = mapping.join('\n');

    if (fs.existsSync(`${__dirname}\\build`) !== true) fs.mkdirSync(`${__dirname}\\build`);

    // Unminified
    if (fs.existsSync(`${__dirname}\\build\\well.js`) === true) fs.unlinkSync(`${__dirname}\\build\\well.js`);
    fs.writeFileSync(`${__dirname}\\build\\well.js`, txt);
})();