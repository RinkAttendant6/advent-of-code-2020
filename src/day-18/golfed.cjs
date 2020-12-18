[$=>$.reduce((c,v,i)=>!i||i%2?c:$[i-1]=='+'?+v+c:+v*c,+$[0]),$=>eval($.join``.replace(/\d+(\+\d+)+/g,m=>eval(m)))].map(E=>{require('fs').readFileSync(process.argv[2],{encoding:`utf8`}).split`
`.map(x=>(x.replace(/[()]/g,` $& `).trim().split(/\s+/).map(_=>_==`(`?f.push([]):_==`)`?f[f.length-2].push(E(f.pop())):f[f.length-1].push(_),f=[[]]),a+=E(f[0])),a=0)
console.log(a)})