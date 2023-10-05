

var news_sources = [["Arab News","https://www.arabnews.com/cat/3/rss.xml"]];

function visit() {
    // based on https://github.com/pokiiio/hatena-blog-parser
    news_sources.forEach(function(elem) {
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
	    console.log(postTitle);
	    console.log(postLink);
	    console.log(postDescr);
	});

    })
}

function doit() {
    visit();
}
