
function searchText() {

    var s = document.getElementById("search").value;
    s = s.toLowerCase().replace("ç","c").replace("ö","o").replace("ğ","g");
    s = s.replace("ı","i").replace("ü","u").replace("ş","s");
    console.log(s);
    
}
