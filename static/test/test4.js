
function get_data() {

    url = "http://192.168.43.49:5000/static/recom/cluster_members_0.json";
    return fetch(url)
        .then((response) => { if(response.ok)  return response.json(); })
        .then((json) => {
            const out = json
            return out;
        });
}

function foo() {
    cluster0 = null;
    this.get_data().then((out) => {
        cluster0 = out
    });

}

function show() {
    document.getElementById("output").innerText = cluster0;
    //document.getElementById("output").innerText = cluster0[3];
}

