// based on https://github.com/pokiiio/hatena-blog-parser
function visit(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url = url, false ); 
    xmlHttp.send( null );
    //console.log(xmlHttp.responseText);
    result = xmlHttp.responseText;

    const blogTitle = result.split('<title>')[1].split('</title>')[0];
    const blogDescription = result.split('<description>')[1].split('</description>')[0];
    let data = [];

    result.split('<item>').forEach(element => {
        const postTitle = element.split('<title>')[1].split('</title>')[0];
        const postLink = element.split('<link>')[1].split('</link>')[0];
	console.log(postTitle);
	console.log(postLink);
    });

}

function doit() {
    visit("https://www.arabnews.com/cat/3/rss.xml");
}
