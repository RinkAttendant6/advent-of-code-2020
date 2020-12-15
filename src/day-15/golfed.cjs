d=require('fs').readFileSync(process.argv[2],{encoding:"utf8"}).split`,`.map(Number)
F=n=>{for(t=0,h=new Map();t<n;++t)r=t<d.length?(t&&h.set(r,t),d[t]):(h.set(r,t,$=h.get(r)),$?t-$:0)
return r}
console.log(F(2020),F(3e7))