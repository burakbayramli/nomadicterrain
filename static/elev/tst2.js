function fromChunk (idx) {

    var indexLimits = [0, 32400000, 64800000, 97200000, 129600000];
    var index=indexLimits.findIndex(function(number) {
	return number > idx;
    });
    return index-1;
    //console.log(index-1);
}

fromChunk(10);

fromChunk(32400001);

fromChunk(33681360);

fromChunk(97200001);

