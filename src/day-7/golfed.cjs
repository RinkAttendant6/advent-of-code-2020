require(`fs`).readFileSync(__dirname+`/input.txt`,{encoding:"utf8"}).split`
`.map(e=>{i={}
for([,q,c]of e.matchAll(/(\d+) ([\w ]+) bags?/g))i[c]=+q
d[e.match(/^([\w ]+?) bags/)[1]]=i},d={})
r=new Set()
for(u=[t=`shiny gold`];p=u.pop();)for([o,i]of(e=Object.entries)(d))i[p]?r.add(o)&u.push(o):0
for(v=[t],s=0;w=v.pop();)for([b,q]of e(d[w]))v.push(...Array(q).fill(b)),s+=q
console.log(r.size,s)