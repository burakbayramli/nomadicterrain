var resolution= 120;

var dataFiles= [
    { name: 'a10g', latMin:    50, latMax:     90, lngMin:   -180, lngMax:    -90, elMin:      1, elMax:    6098, columns:    10800, rows:   4800 },
    { name: 'b10g', latMin:    50, latMax:     90, lngMin:    -90, lngMax:      0, elMin:      1, elMax:    3940, columns:    10800, rows:   4800 },
    { name: 'c10g', latMin:    50, latMax:     90, lngMin:      0, lngMax:     90, elMin:    -30, elMax:    4010, columns:    10800, rows:   4800 },
    { name: 'd10g', latMin:    50, latMax:     90, lngMin:     90, lngMax:    180, elMin:      1, elMax:    4588, columns:    10800, rows:   4800 },
    { name: 'e10g', latMin:     0, latMax:     50, lngMin:   -180, lngMax:    -90, elMin:    -84, elMax:    5443, columns:    10800, rows:   6000 },
    { name: 'f10g', latMin:     0, latMax:     50, lngMin:    -90, lngMax:      0, elMin:    -40, elMax:    6085, columns:    10800, rows:   6000 },
    { name: 'g10g', latMin:     0, latMax:     50, lngMin:      0, lngMax:     90, elMin:   -407, elMax:    8752, columns:    10800, rows:   6000 },
    { name: 'h10g', latMin:     0, latMax:     50, lngMin:     90, lngMax:    180, elMin:    -63, elMax:    7491, columns:    10800, rows:   6000 },
    { name: 'i10g', latMin:   -50, latMax:      0, lngMin:   -180, lngMax:    -90, elMin:      1, elMax:    2732, columns:    10800, rows:   6000 },
    { name: 'j10g', latMin:   -50, latMax:      0, lngMin:    -90, lngMax:      0, elMin:   -127, elMax:    6798, columns:    10800, rows:   6000 },
    { name: 'k10g', latMin:   -50, latMax:      0, lngMin:      0, lngMax:     90, elMin:      1, elMax:    5825, columns:    10800, rows:   6000 },
    { name: 'l10g', latMin:   -50, latMax:      0, lngMin:     90, lngMax:    180, elMin:      1, elMax:    5179, columns:    10800, rows:   6000 },
    { name: 'm10g', latMin:   -90, latMax:    -50, lngMin:   -180, lngMax:    -90, elMin:      1, elMax:    4009, columns:    10800, rows:   4800 },
    { name: 'n10g', latMin:   -90, latMax:    -50, lngMin:    -90, lngMax:      0, elMin:      1, elMax:    4743, columns:    10800, rows:   4800 },
    { name: 'o10g', latMin:   -90, latMax:    -50, lngMin:      0, lngMax:     90, elMin:      1, elMax:    4039, columns:    10800, rows:   4800 },
    { name: 'p10g', latMin:   -90, latMax:    -50, lngMin:     90, lngMax:    180, elMin:      1, elMax:    4363, columns:    10800, rows:   4800 },
];

var baseDir = './all10';

var byteArray;

function load() {
    var url = "/static/elev2/all10/g10g";    
    fetch(url).then(res => res.arrayBuffer())
	.then(arrayBuffer => {
	    byteArray = new Uint8Array(arrayBuffer);
	})
	.then(function(done) {
	    console.log('done');
	    //console.log(byteArray);
	    console.log(byteArray[33681360]);
	    console.log(byteArray[33681361]);

	    var buffer = new ArrayBuffer(2);
	    var Uint8View = new Uint8Array(buffer);
	    Uint8View[0] = byteArray[33681360];
	    Uint8View[1] = byteArray[33681361]

	    var Uint16View = new Uint16Array(buffer);
	    console.log(Uint16View[0]);
	})
	.catch(error => {
	    console.log('error');	    
        });
}

function show() {
    console.log(byteArray);
}

function findFile( lng, lat ) {
    for ( var i in dataFiles ) {
        var df= dataFiles[i];
        if (df.latMin <= lat && df.latMax > lat && df.lngMin <= lng && df.lngMax > lng) {
            return df;
        }
    }
}

function fileIndex( lng, lat, fileEntry, resolution ) {
    var column= Math.floor(lng * resolution);
    var row= Math.floor(lat * resolution);

    var rowIndex= row - fileEntry.latMin * resolution;
    var columnIndex= column - fileEntry.lngMin * resolution;
    var index= ((fileEntry.rows - rowIndex - 1) * fileEntry.columns + columnIndex) * 2;
    return index;
};

function openFile( name ) {
    return fs.openSync(baseDir + '/' + name , 'r');
}

function readNumberFromFile(name,position) {

    var buffer= new Buffer(2);
    var fd = openFile(name);
    // fs.readSync(fd, buffer, offset, length[, position])
    console.log('pos',position);
    if ( fs.readSync(fd, buffer, 0, 2, position) !== 2 ) return new Error('Could not fetch value from file');

    var int16= buffer.readInt16LE(0);
    
    // return 0 for oceans
    return int16 === -500 ? 0 : int16;
}

function getElevation( lng, lat, onError ) {
    var fileEntry= findFile(lng, lat);
    var result= readNumberFromFile(fileEntry.name, fileIndex(lng, lat, fileEntry, resolution));

    return result;
};

//var res = getElevation(29,37);
//console.log(res);
