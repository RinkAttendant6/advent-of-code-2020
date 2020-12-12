a=b=0
require('fs').readFileSync(process.argv[2],{encoding:'utf8'}).split`
`.map(n=>{[x,y,l,,w]=n.split(/[ :-]/)
c=[...w].filter(c=>c==l).length
a+=c>=x&c<=y
b+=w[x-1]==l^w[y-1]==l})
console.log(a,b)