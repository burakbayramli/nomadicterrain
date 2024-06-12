'use strict';
var fs= require('fs');

var resolution= 120;

var dataFiles= [
    // ...
    { name: 'g10g', latMin:     0, latMax:     50, lngMin:      0, lngMax:     90, elMin:   -407, elMax:    8752, columns:    10800, rows:   6000 }
    // ...
];

var baseDir = '/opt/Downloads/globe/all10';

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

var position = 33681360;
console.log('pos',position);
var buffer= new Buffer(2);

var fd = openFile("g10g");
fs.readSync(fd, buffer, 0, 2, position);
var int16= buffer.readInt16LE(0);
console.log(buffer[0]);
console.log(buffer[1]);
console.log(int16);

