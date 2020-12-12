c={}
n=[0,...require('fs').readFileSync(__dirname+`/input.txt`,{encoding:`utf8`}).trim().split`
`.map(Number).sort((a,b)=>a-b)]
d=[,0,,1]
for(i=n.length;i;)++d[n[i]-n[--i]]
F=_=>_<Math.max(...n)?c[_]||(c[_]=[1,2,3].reduce((s,j)=>s+(n.includes(_+j)?F(_+j):0),0),c[_]):1
console.log(d[1]*d[3],F(0))