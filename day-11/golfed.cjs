V=(m,y,x,i,j)=>m[b=y+i]?.[a=x+j]==`#`||~b&&~a&&b<m[L]&&a<m[0][L]&&m[b][a]!=`L`&&V(m,b,a,i,j)
for([t,A]of[[4,1],[5]]){N=require('fs').readFileSync(__dirname+`/input.txt`,{encoding:`utf8`}).trim().split`
`
do{C=[...N]
N=[]
for(y=0;y<C[L=`length`];++y)for(N[y]=[],x=0;x<C[y][L];){s=C[y][x]
u=0
for(i of[-1,0,1])for(j of[-1,0,1])u+=i|j?A?C[y+i]?.[x+j]==`#`:V(C,y,x,i,j):0
N[y][x++]=s=='.'?s:u?u>=t?'L':s:'#'}
N=N.map(v=>v.join``)}while(N.some((v,i)=>v!=C[i]))
console.log(N.join``.replace(/[^#]/g,``)[L])}