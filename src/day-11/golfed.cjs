V=(m,y,x,i,j)=>m[b=y+i]?.[a=x+j]==`#`||~b&&~a&&b<m.length&&a<m[0].length&&m[b][a]!=`L`&&V(m,b,a,i,j)
for([t,A]of[[4,1],[5]]){N=require('fs').readFileSync(process.argv[2],{encoding:`utf8`}).trim().split`
`
do N=(C=[...N]).map((r,y)=>[...r].map((s,x)=>{u=0
for(i of[-1,0,1])for(j of[-1,0,1])u+=i|j?A?C[y+i]?.[x+j]==`#`:V(C,y,x,i,j):0
return s=='.'?s:u?u>=t?'L':s:'#'}).join``)
while(N.some((v,i)=>v!=C[i]))
console.log(N.join``.replace(/[^#]/g,``).length)}