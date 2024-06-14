
async function searchText() {

    var url = "/static/skidx/invidx-o.json";

    var letter_dict;
    await fetch(url)
	.then(response => response.json())
	.then(data => letter_dict = data ).catch(()=>{
	    ///Exception occured do something
	});
    console.log(letter_dict['oturum']);
}
