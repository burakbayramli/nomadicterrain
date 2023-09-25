
function show_picks() {
    if (document.cookie.length < 1) {
        document.cookie = "[]"
    }
    cook = JSON.parse(document.cookie);
    out = "";
    cook.forEach(function(key) {
	out += "<a href=''>" + key + `</a><a onclick='remove("${key}")' class='remove' href='#'>Remove</a><br/>`
    })      
    document.getElementById("picks").innerHTML = out;
}

function remove(movie) {
    cook = JSON.parse(document.cookie);
    cook.splice( cook.indexOf(movie), 1 ); 
    document.cookie = JSON.stringify(cook);
    show_picks();
}

function add_movie() {
    res = document.getElementById("myInput").value;
    cook = JSON.parse(document.cookie);
    cook.push(res);
    document.cookie = JSON.stringify(cook);
}

function recommend() {
    
    alert('yes');    
}
