
function init() {
    var rt = localStorage.getItem('reminder_text');
    const date = new Date();
    const d1 = date.getDate();
    const m1 = date.getMonth() + 1;
    const y1 = date.getFullYear();    
    console.log(rt);
    console.log(d1, m1, y1);
    if (rt != null) {
	rt = JSON.parse(rt);
	Object.keys(rt).forEach(function (x) {
	    console.log('------------------------');
	    console.log(x, rt[x]);
	    var [d2,m2,y2] = x.split("/");
	    console.log(d2,m2,y2);
	    console.log(typeof(d1));
	    console.log(typeof(d2));
	    if ( (d1==d2 | d2=="*") & (m1==m2|m2=="*") & (y1==y2 | y2=="*") ) {
		console.log("match");
	    }
	});
    }
    
}

