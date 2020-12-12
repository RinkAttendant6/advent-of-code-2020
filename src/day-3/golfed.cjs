$=(r,d=1,x=0,y=0,t=0)=>require('fs').readFileSync(__dirname+`/input.txt`,{encoding:"utf8"}).split`
`.map(n=>{y++%d<1?(t+=`#`==n[x%n.length],x+=r):0})&&t
_=[$(1),$(3),$(5),$(7),$(1,2)]
console.log(_[1],_.reduce((a,v)=>a*v))