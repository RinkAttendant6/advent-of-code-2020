d=require('fs').readFileSync(__dirname+`/input.txt`,{encoding:'utf8'}).split`

`
console.log(d.filter(_=>[/\bbyr:/,/\biyr:/,/\beyr:/,/\bhgt:/,/\bhcl:/,/\becl:/,/\bpid:/].every($=>$.test(_))).length,d.filter(_=>[/\bbyr:(19[2-9]\d|200[0-2])\b/,/\biyr:20(1\d|20)\b/,/\beyr:20(2\d|30)\b/,/\bhgt:(1([5-8]\d|9[0-3])cm|(59|6\d|7[0-6])in)\b/,/\bhcl:#[\da-f]{6}\b/,/\becl:(amb|blu|brn|gr[ny]|hzl|oth)\b/,/\bpid:\d{9}\b/].every($=>$.test(_))).length)