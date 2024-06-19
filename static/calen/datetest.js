var sh = require('./dateutil.js')

// Eid Al-Adha (kurban) was at this day 2024
const y = 2024;
const m = 6;
const d = 16;

const julianDay = sh.gregorianToJulian(y, m, d);

const { year, month, day } = sh.julianToHijri(julianDay);

console.log(year, month, day);

// Eid Al-Adha (kurban) is 10th day of last month
var res = sh.hijriToJulian(1446, 12, 10);
res = sh.julianToGregorian(res);

console.log(res.year, res.month, res.day);
