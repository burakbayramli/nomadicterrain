
var news_sources = [["Arab News","https://www.arabnews.com/cat/3/rss.xml"]];

var skip_words = ['Trump','South'];
//var skip_words = [];

function visit() {
    // based on https://github.com/pokiiio/hatena-blog-parser
    out = "";
    news_sources.forEach(function(elem) {
	out += `<h3>${elem[0]}</h3>`;
	console.log(elem[0],elem[1]);
	url = elem[1];
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", url = url, false ); 
	xmlHttp.send( null );
	result = xmlHttp.responseText;
	const blogTitle = result.split('<title>')[1].split('</title>')[0];
	const blogDescription = result.split('<description>')[1].split('</description>')[0];
	let data = [];
	result.split('<item>').forEach(element => {
            const postTitle = element.split('<title>')[1].split('</title>')[0];
            const postLink = element.split('<link>')[1].split('</link>')[0];
            const postDescr = element.split('<description>')[1].split('</description>')[0];
	    let skip_word_found = false;
	    skip_words.forEach(function(word) {
		if (postDescr.includes(word) || postTitle.includes(word)) {
		    skip_word_found = true;
		}
	    })
	    if (! skip_word_found) {
		out += `<p><a href="${postLink}">${postTitle}</a><br/><br/>${postDescr}</p>`;
	    }
	});

    })
    document.getElementById("news").innerHTML = out;
}

function doit() {
    visit();
}
