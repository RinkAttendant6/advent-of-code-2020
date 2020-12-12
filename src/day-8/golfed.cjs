F=D=>{for(a=0,p=0,h=[];1;h.push(p)){w=D[p]
if(w[0]=='a')a+=+w.slice(4)
w[0]=='j'?p+=+w.slice(4):p++
if(p<0|p>=D.length)return{w,a}
if(h.includes(p))return{a}}}
d=require('fs').readFileSync(__dirname+'/input.txt',{encoding:'utf8'}).split`
`
for(i=d.length;--i;){c=[...d]
q=d[i]
if(q[0]=='j')c[i]='n'+c[i]
else if(q[0]=='n')c[i]='j'+c[i]
else continue
if((r=F(c)).w){console.log(F(d).a,r.a)
break}}