
function pct_change(arr) {
    let changes = [];
    for (let i = 1; i < arr.length; i++) {
	changes[i] = arr[i] / arr[i-1] ; 
    }
    return changes;
}

function cumprod(dataset) {

    var out = 1; 
    dataset.forEach(function(element){ 
	out *= element; 
    });
    
    return out;
}

module.exports = {
    cumprod: cumprod,
    pct_change: pct_change
};
