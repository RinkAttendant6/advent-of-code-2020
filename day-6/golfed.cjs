d=require('fs').readFileSync(__dirname+`/input.txt`,{encoding:"utf8"}).split`

`.map(g=>g.split`
`)
console.log(d.reduce($=(a,v)=>a+new Set(v.join``).size,0),d.map(w=>[...w[0]].filter(_=>w.every(q=>q.includes(_))).flat()).reduce($,0))