var sh = require('./dateutil.js')

/**
 * Gregorian to Hijri
 * * First convert to Julian
 * * then convert to hijri
 */
const y = 2024;
const m = 6;
const d = 16;

const julianDay = sh.gregorianToJulian(y, m, d);

const { year, month, day } = sh.julianToHijri(julianDay);

console.log(year, month, day);

// Eid Al-Adha (kurban) is 10th day of last month
const res = sh.hijriToJulian(1446, 12, 10);

console.log(sh.julianToGregorian(res));

