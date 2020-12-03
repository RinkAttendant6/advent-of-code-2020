(async _=>{b=await Promise.all([_(1),a=await _(3),_(5),_(7),_(1,2)])
console.log(a,b.reduce((a,v)=>a*v))})(async(r,d=1,x=0,y=0,t=0,z=require)=>{for await(n of z('readline').createInterface({input:z('fs').createReadStream(__dirname+`/input.txt`)}))if(y++%d<1){t+=`#`==n[x%n.length]
x+=r}return t})