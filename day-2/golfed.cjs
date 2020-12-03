(async _=>{a=b=0
for await(n of require('readline').createInterface({input:require('fs').createReadStream(__dirname+`/input.txt`)})){[g,r,w]=n.split` `
l=r[0]
c=[...w].filter(c=>c==l).length;[x,y]=g.split`-`
a+=c>=x&&c<=y
b+=w[x-1]==l^w[y-1]==l}console.log(a,b)})()
