[I,[,Y],N]=require('fs').readFileSync(process.argv[2],{encoding:"utf8"}).trim()[S=`split`]`

`[M=`map`](s=>s[S]`
`)
V=$=>(O=Object).values(R).some(v=>v.some(([a,b])=>$>=a&&$<=b))
R={}
I[M](l=>{[k,v]=l[S]`: `
R[k]=v[S]` or `[M](r=>r[S]`-`)})
T=N.slice(1)[M](t=>t[S]`,`[M](Number))
K=T[F=`filter`](t=>t[E=`every`](V))[M](t=>t[M]($=>O.entries(R)[M](([k,v])=>v.some(([a,b])=>$>=a&&$<=b)?k:0)[F](_=>_)))
x=T[0][M]((_,i)=>O.keys(R)[F](k=>K[E](w=>w[i].includes(k))))
for(a=[];x.some(j=>j.length);)a[u=x.findIndex(k=>k.length==1)]=x[u].pop(),x=x[M](j=>j[F](k=>k!=a[u]))
P=Y[S]`,`[F]((_,i)=>a[i].startsWith`departure`)[r=`reduce`]((p,n)=>p*n,1)
console.log(T[F](t=>!t[E](V))[r]((s,t)=>s+t[F](n=>!V(n))[r]((a,b)=>a+b,0),0),P)