
function cumprod(dataset) {

    var out = 1; 
    dataset.forEach(function(element){ 
	out *= element; 
    });
    
    return out;
}

module.exports = {
      cumprod: cumprod
};
