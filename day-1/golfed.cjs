o=console.log,n=require(`fs`).readFileSync(__dirname+`/input.txt`,{encoding:`utf8`}).trim().split`\n`,l=n.length-1
for(i=l;a=+n[i],i;)for(j=--i;b=+n[j],j;--j)a+b==2020&&o(a*b)
for(x=l;c=+n[x],x;)for(y=--x;d=+n[y],y;)for(z=--y;e=+n[z],z;--z)c+d+e==2020&&o(c*d*e)