
var json1 =  '{ "key1": "val1", "key2": "value2" }';
var json2 =  '[2,3,4,5]';

json1 = JSON.parse(json1);
json2 = JSON.parse(json2);

console.log(json1['key1']);
console.log(json2[2]);

var l1 = [1,2,3,4];
text = "";
for (let i = 0; i < l1.length; i++) {
  text += l1[i] + "<br>";
}

console.log(text);


