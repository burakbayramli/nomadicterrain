
async function init() {

    var url = "/static/elev/data/g10g2";
    // 33681360-33681361 => 1281360

    var promises = [];

    promises.push(
	fetch(url, {
            headers: {
		'content-type': 'multipart/byteranges',
		'range': 'bytes=1281360-1281361',
            },
	})
    );

    promises.push(
	fetch(url, {
            headers: {
		'content-type': 'multipart/byteranges',
		'range': 'bytes=1281362-1281363',
            },
	})
    );
    
    const responses = await Promise.all(promises);
    
    const data1 = await Promise.all( responses.map(response => response.arrayBuffer() ));
    
    const data2 = await Promise.all( data1.map(response => new Uint16Array(response) ));

    data2.forEach(function(x) {
	console.log(x[0]);
    });
    
}
