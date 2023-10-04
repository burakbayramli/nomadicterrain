
function init() {
    alert (all_apps);
    //alert(document.getElementById("owm_key").value);
    if (document.cookie.length < 1) {
	empty = {"weather": {}, "movies": {}}
	document.cookie = 'bb=' + JSON.stringify(empty) + '; expires=Wed, 05 Aug 2025 23:00:00 UTC;path=/';
    }
    var elems = document.cookie.split("=");
    pref = JSON.parse(elems[1]);
    if ('owm_key' in pref['weather']) {
	document.getElementById("owm_key").value = pref['weather']['owm_key'];
    }
    
}

function set_owm_key() {
    var elems = document.cookie.split("=");
    pref = JSON.parse(elems[1]); 
    pref['weather']['owm_key'] = document.getElementById("owm_key").value;
    document.cookie = 'bb=' + JSON.stringify(pref) + '; expires=Wed, 05 Aug 2025 23:00:00 UTC;path=/';
}
