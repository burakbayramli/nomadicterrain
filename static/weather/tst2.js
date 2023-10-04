
function init() {
    prefs = get_prefs();
    console.log(prefs);
    if ('owm_key' in prefs['weather']) {
	document.getElementById("owm_key").value = prefs['weather']['owm_key'];
    }
    
}

function set_owm_key() {
    prefs = get_prefs();
    prefs['weather']['owm_key'] = document.getElementById("owm_key").value;
    save_cookie(prefs);
}
