s=require('fs').readFileSync(process.argv[2],{encoding:`utf8`}).trim``.replace(/[FL]/g,0).replace(/[BR]/g,1).split`\n`.map(l=>eval('0b'+l)).sort((a,b)=>a-b)
console.log(s.pop(),s.find((t,i)=>t-i-s[0])-1)