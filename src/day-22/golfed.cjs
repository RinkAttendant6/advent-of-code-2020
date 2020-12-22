[A,B]=require('fs').readFileSync(process.argv[2],{encoding:"utf8"}).trim().split`

`.map(l=>l.split`
`[S=`slice`](1))
$=(R=(X,Y,c=[],d=[])=>{while(X[L=`length`]&&Y[L]){if(c[I=`includes`](m=X+``)|d[I](n=Y+``))return[,X]
let x=+X[H=`shift`](),y=+Y[H]()
c[P=`push`](m)
d[P](n);(X[L]<x|Y[L]<y?x<y:R(X[S](0,x),Y[S](0,y))[0])?Y[P](y,x):X[P](x,y)}return[!X[L],X[L]?X:Y]})([...A],[...B])[1]
while(A[L]&&B[L])(a=+A[H]())>(b=+B[H]())?A[P](a,b):B[P](b,a)
console.log([A[L]?A:B,$].map(d=>d.reduce((a,v,i)=>v*(d[L]-i)+a,0)))