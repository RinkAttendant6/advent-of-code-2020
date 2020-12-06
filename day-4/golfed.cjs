r=[/\bbyr:(19[2-9]\d|200[0-2](\s|$))?/,/\biyr:(20(1\d|20)(\s|$))?/,/\beyr:(20(2\d|30)(\s|$))?/,/\bhgt:(1([5-8]\d|9[0-3])cm|(59|6\d|7[0-6])in(\s|$))?/,/\bhcl:(#[\da-f]{6}(\s|$))?/,/\becl:((amb|blu|brn|gr[ny]|hzl|oth)(\s|$))?/,/\bpid:(\d{9}(\s|$))?/]
console.log(require('fs').readFileSync(__dirname+`/input.txt`,{encoding:"utf8"}).split`

`.reduce(([x,y],_)=>[x+r.every($=>$.test(_)),y+r.every($=>$.exec(_)?.[1])],[0,0]))