
KM_DEG = 0.009;

function degToRad(deg) {
    return deg * (Math.PI / 180.0);
}

function goto(fr, a, d) {

    var N = 30;
    var D = d*KM_DEG;
    var res = [];
    var P  = D / N
    //console.log(Math.sin(degToRad(180)));
    //console.log(Math.sin(2*Math.PI / 4));
    for (var i=0;i<N; i++) {
	lat = fr[0] + (P*i)*Math.sin(a);
	lon = fr[1] + (P*i)*Math.cos(a);
	res.push([lat,lon]);
    }
    return res;
}

res = goto ([30,20],degToRad(180),5);
console.log(res);

