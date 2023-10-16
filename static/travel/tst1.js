s = "<img ksdasdf> kajsdf lkjaskf";
const regex = /<img .*?>/i;
s = s.replace(regex, '');
console.log(s);

const re = /\w+\s/g;
const str = "fee fi fo fum";
const myArray = str.match(re);
console.log(myArray);

const re2 = /<a>.*?<\/a>/g;
const str2 = "<a>1</a>kajsdkjfasd<a>2</a>";
const arr2 = str2.match(re2);
console.log(arr2);

console.log("sskdlkjlsdlkjkjsss".includes("ssasdkfsdfk"));
