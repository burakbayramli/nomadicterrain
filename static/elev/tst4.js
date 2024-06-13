
const fetchURLs = async (urls) => {

    var promises = urls.map(url => fetch(url));

    const responses = await Promise.all(promises);

    const data = await Promise.all( responses.map(response => response.text()) );

    console.log(data)

    console.log('done')
        
}

async function init() {

    const urls = ['https://raw.githubusercontent.com/burakbayramli/kod/master/t1.txt',
		  'https://raw.githubusercontent.com/burakbayramli/kod/master/t2.txt'];
    console.log('1');
    await fetchURLs(urls);
    console.log('2');
}

