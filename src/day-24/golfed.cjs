N=t=>{[x,y]=t.split` `
return[[++x,y],[x--,++y],[x--,y],[x,--y],[x++,--y],[x,y]].map(w=>w.join` `)}
require('fs').readFileSync(process.argv[2],{encoding:"utf8"}).trim().split`
`[F=`forEach`](d=>{i=y=x=0
for(;i<d[L=`length`];){c=d[i++]
c+=c=='n'||c=='s'?d[i++]:''
x+=c=='e'||c=='ne'
x-=c=='w'||c=='sw'
y+=c[0]=='n'
y-=c[0]=='s'
}T.has(_=x+" "+y)?T.delete(_):T.add(_)},T=new Set)
q=T.size
for(z=0;z<100;++z){
T[F]($=>N($)[F](_=>S.add(_)),S=new Set(...T))
S[F]($=>((b=N($).filter(_=>T.has(_)))[L]&&b[L]<3&T.has($)||!T.has($)&b[L]==2)?U.add($):0,U=new Set)
T=U}
console.log(q,T.size)