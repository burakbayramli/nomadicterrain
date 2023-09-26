
function fetch_means_data() {

    url = "http://192.168.43.49:5000/static/recom/means.json";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function fetch_title_id_data() {

    url = "http://192.168.43.49:5000/static/recom/movie_title_int.json";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


function closest_cluster(picks, means, title_id) {
    K = Object.keys(means).length;
    dist = [];
    for (let i = 0; i < K; i++) {
	dist_k = 0;
	Object.keys(picks).forEach(function(key) {
	    dist_k += (picks[key] - means[i][title_id[key]])**2;
	})
	dist.push(Math.sqrt(dist_k));
    }

    const index = dist.indexOf(Math.min(...dist))
    //console.log(dist);
    return index;
}

function show_picks() {
    if (document.cookie.length < 1) JSON.stringify({});
    cook = JSON.parse(document.cookie);
    out = "";
    Object.keys(cook).forEach(function(key) {
	out += "<a href=''>" + key + `</a><a onclick='remove("${key}")' class='remove' href='#'>Remove</a><br/>`
    })      
    document.getElementById("picks").innerHTML = out;
}

function remove(movie) {
    cook = JSON.parse(document.cookie);
    delete cook[movie];
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
    picks = JSON.parse(document.cookie);
    means = JSON.parse(fetch_means_data());
    title_id = JSON.parse(fetch_title_id_data());            
    res = closest_cluster(picks, means, title_id);
    alert(res);
}
