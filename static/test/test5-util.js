function show_picks() {
    cook = JSON.parse(document.cookie);
    out = "";
    Object.keys(cook).forEach(function(key) {
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
    mov = document.getElementById("myInput").value;
    rat = document.getElementById("myRating").value;
    cook = JSON.parse(document.cookie);
    cook[mov] = rat;
    document.cookie = JSON.stringify(cook);
}

function recommend() {
    
    alert('yes');    
}
