$=require('fs').readFileSync(process.argv[2],{encoding:"utf8"}).trim()[S=`split`]`
`.map(f=>(([i,a]=f.slice(0,-1)[S]` (contains `),w=i[S]` `,a[S]`, `.map(A=>p[A]?p[A].push(w):p[A]=[w]),w),p={})
d={}
for([g,l]of(O=Object)[E=`entries`](p))d[g]=l[0][F=`filter`](i=>l.every(s=>s[I=`includes`](i)))
_=$.flatMap(f=>f[F](i=>!O.values(d).flat()[I](i)))[L=`length`]
for(r={};O.keys(d)[L];)for([g,j]of O[E](d))if(j[L]<2){r[g]=j[0]
delete d[g]
for([x,y]of O[E](d))d[x]=y[F](k=>k!=j[0])}console.log(_,O.keys(r).sort().map(k=>r[k]).join`,`)