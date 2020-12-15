Z=$=>$.includes(x="X")?Z($.replace(x,0)).concat(Z($.replace(x,1))):[$]
B=v=>(+v).toString(2).padStart(36,0).split``
a=new Map()
b=new Map()
require('fs').readFileSync(process.argv[2],{encoding:"utf8"}).trim(m="").split`
`.map(l=>{[k,v]=l.split` = `
p=+k.match(/\d+/)?.[0]
p?(a.set(p,parseInt(B(v).map((_,i)=>m[i]=="X"?_:m[i]).join``,2)),Z(B(p).map((_,i)=>m[i]==0?_:m[i]).join``).map(_=>b.set(parseInt(_,2),+v))):m=v})
S=M=>[...M.values()].reduce((s,v)=>s+v,0)
console.log(S(a),S(b))