const fs = require('fs');

// At this point we don't compare cpu clock accuracy,
// only operation of instructions. The flow of instructions
// should follow nestest.log if the cpu is operating correctly

const nestest = fs.readFileSync('./nestest.log').toString().split(/\r?\n/);
let output = fs.readFileSync('./output.txt').toString().split(/\r?\n/);

output = output.filter((line) => line.match(/^[0-9a-f]{4}  [0-9a-f]{2} /));

let lineno = 0;
for (let line of nestest) {
    const outline = output[lineno];
    if (!outline) break;
    lineno++;
    let info = line.split(/\s+/).map(x => x.toUpperCase());
    let info2 = outline.split(/\s+/).map(x => x.toUpperCase());

    if (info[0] !== info2[0]) {
        console.log('PC', info[0], info2[0], 'at line ', lineno);
        break;
    } else if (info[1] !== info2[1]) {
        console.log('OPCODE', info[1], info2[1], 'at line ', lineno);
        break;
    }
}
if (lineno < nestest.length) {
    console.log('nestest.log is shorter than output.txt at line %o', lineno);
}