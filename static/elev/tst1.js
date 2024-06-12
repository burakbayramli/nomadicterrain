//    33681360  
// 0, 32400000, 64800000, 97200000, 129600000
// http://192.168.43.49:5000/static/elev/tst1.html
function init() {

    var url = "/static/elev/data/g10g2";
    // 33681360-33681361 => 1281360
    fetch(url, {
        headers: {
            'content-type': 'multipart/byteranges',
            'range': 'bytes=1281360-1281361',
        },
    }).then(response => {
        if (response.ok) {
	    return response.arrayBuffer();
        }
    }).then(response => {
	var a = new Uint8Array(response);
        console.log(a[0]);
        console.log(a[1]);
	var res = new Uint16Array(response);
        console.log(res[0]);

    });
    
}
