d=require('fs').readFileSync(process.argv[2],{encoding:"utf8"}).trim().split`
`.map(Number)
for(i=25,a=null;!a&&i<(L=d.length);++i)a=d[S=`slice`](i-25,i).flatMap((q,i,_)=>_[S](i+1).map(e=>e+q)).includes(d[i])?null:d[i]
for(i=0;i<L-1;++i)for(s=d[i],j=i+1;s<a&&j<L;)L=(s+=d[j++])==a?[r=d[S](i,j),console.log(a,Math.min(...r)+Math.max(...r))]:L