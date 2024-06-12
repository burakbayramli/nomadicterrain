
function init() {

    var url = "/static/elev/data/g10g1";
    
    fetch(url, {
        headers: {
            'content-type': 'multipart/byteranges',
            'range': 'bytes=2-2',
        },
    }).then(response => {
        if (response.ok) {
	    return response.arrayBuffer();
        }
    }).then(response => {
	var a = new Uint8Array(response);
        console.log(a[0]);
    });
    
}
