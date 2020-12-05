s={}
f=m=0
require('fs').readFileSync(__dirname+`/input.txt`,{encoding:'utf8'}).trim().replace(/[FL]/g,0).replace(/[BR]/g,1).split`\n`.map(l=>{m=Math.max(m,d=eval('0b'+l))
s[d]=1})
for(i=1024;f=f||s[i],i--;)i=f&&!s[i]?console.log(m,i):i