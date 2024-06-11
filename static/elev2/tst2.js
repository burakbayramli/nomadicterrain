'use strict';
var path= require('path');
var fs= require('fs');

var resolution= 120;

var dataFiles= [
    { name: 'g10g', latMin:     0, latMax:     50, lngMin:      0, lngMax:     90, elMin:   -407, elMax:    8752, columns:    10800, rows:   6000 }
];

var dataPath;

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

var openFiles= {};

function openFile( name ) {
    return fs.openSync("all10/" + name , 'r');
}

function readNumberFromFile(name,position) {

    var buffer= new Buffer(2);

    var fd = openFile(name);
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

var res = getElevation(29,37);

console.log(res);
